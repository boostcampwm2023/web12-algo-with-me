import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardGateway } from './dashboard.gateway';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './entities/dashboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard])],
  providers: [DashboardGateway, DashboardService],
  controllers: [DashboardController],
  exports: [DashboardService],
})
export class DashboardModule {}
