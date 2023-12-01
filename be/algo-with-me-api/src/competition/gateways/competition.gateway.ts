import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
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
  ) {}

  afterInit(server: Server) {
    this.competitionService.server = server;
  }

  @SubscribeMessage('submission')
  // TODO: 검증 실패시 에러 터져버리고, websocket으로 internal server error 가는거 수정해야됨.
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleSubmission(
    @MessageBody() createSubmissionDto: CreateSubmissionDto,
    @ConnectedSocket() client: Socket,
  ) {
    const authTokenPayloadDto: AuthTokenPayloadDto = this.authService.verifyToken(
      client.handshake.auth.token,
    );
    const user: User = await this.userService.getByEmail(authTokenPayloadDto.sub);
    const testcaseNum: number = await this.problemService.getProblenTestcaseNum(
      createSubmissionDto.problemId,
    );
    this.competitionService.scoreSubmission(createSubmissionDto, client.id, user);
    console.log(createSubmissionDto);
    client.emit('scoreStart', { message: '채점을 시작합니다.', testcaseNum: testcaseNum });
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
      // 검증 로직 주석처리
      const authTokenPayloadDto: AuthTokenPayloadDto = this.authService.verifyToken(
        client.handshake.auth.token,
      );
      client.data['competitionId'] = Number(competitionId);
      client.data['email'] = authTokenPayloadDto.sub;
      // const user: User = await this.userService.getByEmail(authTokenPayloadDto.sub);
      // await this.competitionService.isUserJoinedCompetition(Number(competitionId), user.id);
      client.join(competitionId);
      this.dashboardService.registerUserAtCompetition(
        Number(competitionId),
        authTokenPayloadDto.sub,
      );
      console.log(client.id, client.handshake.auth);
      console.log(competitionId, args);
    } catch (error) {
      client.emit('errorMessage', { message: `${error.message}` });
      client.disconnect();
    }
  }
}
