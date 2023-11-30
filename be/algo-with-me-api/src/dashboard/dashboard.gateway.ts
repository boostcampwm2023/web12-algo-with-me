import {
  ConnectedSocket,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { DashboardService } from './dashboard.service';

@WebSocketGateway({ namespace: 'dashboards' })
export class DashboardGateway implements OnGatewayConnection {
  constructor(private readonly dashboardService: DashboardService) {}

  // @SubscribeMessage('createDashboard')
  // create(@MessageBody() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardService.create(createDashboardDto);
  // }

  @SubscribeMessage('dashboard')
  async handleDashboard(@ConnectedSocket() client: Socket) {
    const dashboard = await this.dashboardService.getTop100DashboardRedis(
      client.data['competitionId'],
    );
    client.emit('dashboard', dashboard);
  }

  public handleConnection(client: Socket, ...args: any[]) {
    const { competitionId } = client.handshake.query;
    client.data['competitionId'] = competitionId;
    client.join(competitionId);
    console.log(args);
  }
}
