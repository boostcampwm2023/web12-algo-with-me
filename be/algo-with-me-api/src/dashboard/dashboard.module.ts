import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardGateway } from './dashboard.gateway';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './entities/dashboard.entity';

import { Competition } from '@src/competition/entities/competition.entity';
import { CompetitionProblem } from '@src/competition/entities/competition.problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard, CompetitionProblem, Competition])],
  providers: [DashboardGateway, DashboardService],
  controllers: [DashboardController],
  exports: [DashboardService],
})
export class DashboardModule {}
