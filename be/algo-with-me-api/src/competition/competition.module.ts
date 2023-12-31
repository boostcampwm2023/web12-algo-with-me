import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompetitionController } from './controllers/competition.controller';
import { ProblemController } from './controllers/problem.controller';
import { CompetitionParticipant } from './entities/competition.participant.entity';
import { CompetitionProblem } from './entities/competition.problem.entity';
import { Problem } from './entities/problem.entity';
import { Submission } from './entities/submission.entity';
import { CompetitionGateWay } from './gateways/competition.gateway';
import { CompetitionService } from './services/competition.service';
import { ProblemService } from './services/problem.service';

import { AuthModule } from '@src/auth/auth.module';
import { Competition } from '@src/competition/entities/competition.entity';
import { DashboardModule } from '@src/dashboard/dashboard.module';
import { User } from '@src/user/entities/user.entity';
import { UserModule } from '@src/user/user.module';

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
  controllers: [ProblemController, CompetitionController],
  providers: [ProblemService, CompetitionService, CompetitionGateWay],
  exports: [CompetitionService],
})
export class CompetitionModule {}
