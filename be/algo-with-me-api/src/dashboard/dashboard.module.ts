import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardGateway } from './dashboard.gateway';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './entities/dashboard.entity';
import { CompetitionModule } from '../competition/competition.module';
import { Competition } from '../competition/entities/competition.entity';
import { CompetitionProblem } from '../problem/entities/competition.problem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dashboard, CompetitionProblem, Competition]),
    forwardRef(() => CompetitionModule),
  ],
  providers: [DashboardGateway, DashboardService],
  controllers: [DashboardController],
  exports: [DashboardService],
})
export class DashboardModule {}
