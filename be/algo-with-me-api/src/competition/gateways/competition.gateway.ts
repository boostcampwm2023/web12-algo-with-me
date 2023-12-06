import { Inject, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Server, Socket } from 'socket.io';

import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { CompetitionService } from '../services/competition.service';
import { ProblemService } from '../services/problem.service';

import { AuthTokenPayloadDto } from '@src/auth/dto/auth.token.payload.dto';
import { AuthService } from '@src/auth/services/auth.service';
import { DashboardService } from '@src/dashboard/dashboard.service';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/services/user.service';

@WebSocketGateway({ namespace: 'competitions' })
export class CompetitionGateWay implements OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly competitionService: CompetitionService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly problemService: ProblemService,
    private readonly dashboardService: DashboardService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  afterInit(server: Server) {
    this.competitionService.server = server;
  }

  @SubscribeMessage('submission')
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleSubmission(
    @MessageBody() createSubmissionDto: CreateSubmissionDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.competitionService.isCompetitionOngoing(client.data['competitionId']);
      const user: User = await this.userService.getByEmail(client.data['email']);
      const testcaseNum: number = await this.problemService.getProblemTestcaseNum(
        createSubmissionDto.problemId,
      );
      await this.competitionService.scoreSubmission(createSubmissionDto, client.id, user);
      client.emit('scoreStart', { message: '채점을 시작합니다.', testcaseNum: testcaseNum });
      this.logger.debug('제출 채점 시작');
    } catch (error) {
      this.logger.debug(`제출 검증 실패: ${error.message}`);
      client.emit('message', { message: `${error.message}` });
      client.disconnect();
    }
  }

  @SubscribeMessage('ping')
  async handlePing(@ConnectedSocket() client: Socket) {
    client.emit('ping', new Date());
  }

  @SubscribeMessage('dashboard')
  async handleDashboard(@ConnectedSocket() client: Socket) {
    const dashboard = await this.dashboardService.getTop100DashboardRedis(
      client.data['competitionId'],
      client.data['email'],
    );
    client.emit('dashboard', dashboard);
  }

  public async handleConnection(client: Socket, ...args: any[]) {
    try {
      const { competitionId } = client.handshake.query;
      const authTokenPayloadDto: AuthTokenPayloadDto = this.authService.verifyToken(
        client.handshake.auth.token,
      );
      // 유저가 대회 참여자가 맞는지 검증
      const user: User = await this.userService.getByEmail(authTokenPayloadDto.sub);
      await this.competitionService.isUserJoinedCompetition(Number(competitionId), user);

      // 동일한 유저의 다른 연결 끊기
      this.server.to(authTokenPayloadDto.sub).disconnectSockets();

      // 만약 종료된 대회에 연결하려고 하면 끊기
      await this.competitionService.isCompetitionFinished(Number(competitionId));

      client.data['competitionId'] = Number(competitionId);
      client.data['email'] = authTokenPayloadDto.sub;
      client.join(competitionId);
      client.join(authTokenPayloadDto.sub);

      await this.dashboardService.registerUserAtCompetition(
        Number(competitionId),
        authTokenPayloadDto.sub,
      );
      this.logger.debug(
        `competition 웹소켓 연결 성공, competition id: ${competitionId}, client id: ${client.id}, email: ${authTokenPayloadDto.sub}, args: ${args}`,
      );
    } catch (error) {
      this.logger.debug(`competition 웹소켓 연결 실패: ${error.message}`);
      client.emit('message', { message: `${error.message}` });
      client.disconnect();
    }
  }
}
