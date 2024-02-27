import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompetitionController } from './controllers/competition.controller';
import { Competition } from './entities/competition.entity';
import { CompetitionParticipant } from './entities/competition.participant.entity';
import { Submission } from './entities/submission.entity';
import { CompetitionGateWay } from './gateways/competition.gateway';
import { CompetitionService } from './services/competition.service';
import { AuthModule } from '../auth/auth.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { CompetitionProblem } from '../problem/entities/competition.problem.entity';
import { Problem } from '../problem/entities/problem.entity';
import { ProblemService } from '../problem/services/problem.service';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Problem,
      Submission,
      Competition,
      CompetitionProblem,
      CompetitionParticipant,
      User,
    ]),
    BullModule.registerQueue({
      name: 'submission',
    }),
    AuthModule,
    UserModule,
    forwardRef(() => DashboardModule),
  ],
  controllers: [CompetitionController],
  providers: [ProblemService, CompetitionService, CompetitionGateWay],
  exports: [CompetitionService],
})
export class CompetitionModule {}
