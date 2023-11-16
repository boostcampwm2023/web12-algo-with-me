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

@WebSocketGateway({ namespace: 'competitions' })
export class CompetitionGateWay implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): WsResponse<unknown> {
    this.server.emit('events', { data: '데이터 간다' });
    client.emit('events', { data: '데이터 간다22' });
    const event = 'events';
    console.log(client.rooms);
    console.log(data);
    return { event, data };
  }

  @SubscribeMessage('submissions')
  handleSubmission(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    console.log(data, client);
  }

  public handleConnection(client: Socket, ...args: any[]) {
    // TODO: 사용자가 대회 참여중인지 확인하는 로직 추가해야 함
    const { competitionId } = client.handshake.query;
    client.join(competitionId);
    client.leave(client.id);
    console.log(competitionId, args);
  }
}
