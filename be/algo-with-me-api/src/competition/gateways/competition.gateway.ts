import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { CompetitionService } from '../services/competition.service';
import { ProblemService } from '../services/problem.service';

import { AuthTokenPayloadDto } from '@src/auth/dto/auth.token.payload.dto';
import { AuthService } from '@src/auth/services/auth.service';
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
  ) {}

  afterInit(server: Server) {
    this.competitionService.server = server;
  }

  @SubscribeMessage('submissions')
  // TODO: 검증 실패시 에러 터져버리고, websocket으로 internal server error 가는거 수정해야됨.
  @UsePipes(new ValidationPipe({ transform: true }))
  async handleSubmission(
    @MessageBody() createSubmissionDto: CreateSubmissionDto,
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<unknown>> {
    const authTokenPayloadDto: AuthTokenPayloadDto = this.authService.verifyToken(
      client.handshake.headers.authorization,
    );
    const user: User = await this.userService.getByEmail(authTokenPayloadDto.sub);
    const testcaseNum: number = await this.problemService.getProblenTestcaseNum(
      createSubmissionDto.problemId,
    );
    this.competitionService.scoreSubmission(createSubmissionDto, client.id, user);
    const event = 'messages';
    const data = { message: '채점을 시작합니다.', testcaseNum: testcaseNum };
    console.log(createSubmissionDto);
    return { event, data };
  }

  public async handleConnection(client: Socket, ...args: any[]) {
    try {
      const { competitionId } = client.handshake.query;
      const authTokenPayloadDto: AuthTokenPayloadDto = this.authService.verifyToken(
        client.handshake.headers.authorization,
      );
      const user: User = await this.userService.getByEmail(authTokenPayloadDto.sub);
      await this.competitionService.isUserJoinedCompetition(Number(competitionId), user.id);
      client.join(competitionId);
      console.log(client.id);
      console.log(competitionId, args);
    } catch (error) {
      client.emit('messages', { message: `${error.message}` });
      client.disconnect();
    }
  }
}
