import { WebSocketGateway } from '@nestjs/websockets';

import { DashboardService } from './dashboard.service';

@WebSocketGateway()
export class DashboardGateway {
  constructor(private readonly dashboardService: DashboardService) {}

  // @SubscribeMessage('createDashboard')
  // create(@MessageBody() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardService.create(createDashboardDto);
  // }

  // @SubscribeMessage('findAllDashboard')
  // findAll() {
  //   return this.dashboardService.findAll();
  // }

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
