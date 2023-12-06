import { Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Socket } from 'socket.io';

import { DashboardService } from './dashboard.service';

import { CompetitionService } from '@src/competition/services/competition.service';

@WebSocketGateway({ namespace: 'dashboards' })
export class DashboardGateway implements OnGatewayConnection {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly competitionService: CompetitionService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @SubscribeMessage('dashboard')
  async handleDashboard(@ConnectedSocket() client: Socket) {
    const dashboard = await this.dashboardService.getTop100DashboardRedis(
      client.data['competitionId'],
    );
    client.emit('dashboard', dashboard);
  }

  public async handleConnection(client: Socket, ...args: any[]) {
    try {
      const { competitionId } = client.handshake.query;
      client.data['competitionId'] = competitionId;
      await this.competitionService.isCompetitionFinished(Number(competitionId));
      client.join(competitionId);
      this.logger.debug(
        `dashboard 웹소켓 연결 성공, competition id: ${competitionId}, client id: ${client.id}, args: ${args}`,
      );
    } catch (error) {
      this.logger.debug(`dashboard 웹소켓 연결 실패: ${error.message}`);
      client.emit('message', { message: `${error.message}` });
      client.disconnect();
    }
  }
}
