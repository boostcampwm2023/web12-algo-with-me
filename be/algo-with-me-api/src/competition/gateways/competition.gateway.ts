import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { CompetitionService } from '../services/competition.service';

@WebSocketGateway({ namespace: 'competitions' })
export class CompetitionGateWay implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly competitionService: CompetitionService) {}

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): WsResponse<unknown> {
    this.server.emit('events', { data: '데이터 간다' });
    client.emit('events', { data: '데이터 간다22' });
    this.server.to(client.id).emit('events', { data: '데이터 간다 33' });
    const event = 'events';
    console.log(client.id);
    console.log(client.rooms);
    console.log(data);
    return { event, data };
  }

  @SubscribeMessage('submissions')
  handleSubmission(
    @MessageBody() createSubmissionDto: CreateSubmissionDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.competitionService.scoreSubmission(createSubmissionDto, client.id);
    client.emit('message', { message: '채점을 시작합니다.' });
    console.log(createSubmissionDto, client);
  }

  public handleConnection(client: Socket, ...args: any[]) {
    // TODO: 사용자가 대회 참여중인지 확인하는 로직 추가해야 함
    const { competitionId } = client.handshake.query;
    client.join(competitionId);
    console.log(competitionId, args);
  }
}
