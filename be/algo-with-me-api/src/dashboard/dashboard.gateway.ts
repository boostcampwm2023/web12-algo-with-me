import { ConnectedSocket, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { DashboardService } from './dashboard.service';

@WebSocketGateway({ namespace: 'dashboards' })
export class DashboardGateway {
  constructor(private readonly dashboardService: DashboardService) {}

  // @SubscribeMessage('createDashboard')
  // create(@MessageBody() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardService.create(createDashboardDto);
  // }

  @SubscribeMessage('dashboard')
  handleDashboard(@ConnectedSocket() client: Socket) {
    client.emit('dashboard', 'return');
  }

  // @SubscribeMessage('findOneDashboard')
  // findOne(@MessageBody() id: number) {
  //   return this.dashboardService.findOne(id);
  // }

  // @SubscribeMessage('updateDashboard')
  // update(@MessageBody() updateDashboardDto: UpdateDashboardDto) {
  //   return this.dashboardService.update(updateDashboardDto.id, updateDashboardDto);
  // }

  // @SubscribeMessage('removeDashboard')
  // remove(@MessageBody() id: number) {
  //   return this.dashboardService.remove(id);
  // }
}
