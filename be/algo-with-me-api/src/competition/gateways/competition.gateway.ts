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

import { AuthService } from '@src/auth/services/auth.service';

@WebSocketGateway({ namespace: 'competitions' })
export class CompetitionGateWay implements OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly competitionService: CompetitionService,
    private readonly authService: AuthService,
  ) {}

  afterInit(server: Server) {
    this.competitionService.server = server;
  }

  // @SubscribeMessage('events')
  // handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): WsResponse<unknown> {
  //   this.server.emit('events', { data: '데이터 간다' });
  //   client.emit('events', { data: '데이터 간다22' });
  //   this.server.to(client.id).emit('events', { data: '데이터 간다 33' });
  //   const event = 'events';
  //   console.log(client.id);
  //   console.log(client.rooms);
  //   console.log(data);
  //   return { event, data };
  // }

  @SubscribeMessage('submissions')
  // TODO: 검증 실패시 에러 터져버리고, websocket으로 internal server error 가는거 수정해야됨.
  @UsePipes(new ValidationPipe({ transform: true }))
  handleSubmission(
    @MessageBody() createSubmissionDto: CreateSubmissionDto,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    this.competitionService.scoreSubmission(createSubmissionDto, client.id);
    const event = 'messages';
    const data = { message: '채점을 시작합니다.' };
    console.log(createSubmissionDto);
    return { event, data };
  }

  public handleConnection(client: Socket, ...args: any[]) {
    try {
      const { competitionId } = client.handshake.query;
      this.authService.verifyToken(client.handshake.headers.authorization);
      // TODO: 유저가 대회 참가했는지 검증 필요
      client.join(competitionId);
      console.log(client.id);
      console.log(competitionId, args);
    } catch (error) {
      client.emit('messages', { message: `${error.message}` });
    }
  }
}
