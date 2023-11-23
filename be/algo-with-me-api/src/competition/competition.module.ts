import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompetitionController } from './controllers/competition.controller';
import { ProblemController } from './controllers/problem.controller';
import { CompetitionProblem } from './entities/competition.problem.entity';
import { Problem } from './entities/problem.entity';
import { Submission } from './entities/submission.entity';
import { CompetitionGateWay } from './gateways/competition.gateway';
import { CompetitionService } from './services/competition.service';
import { ProblemService } from './services/problem.service';

import { AuthModule } from '@src/auth/auth.module';
import { Competition } from '@src/competition/entities/competition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Submission, Competition, CompetitionProblem]),
    BullModule.registerQueue({
      name: process.env.REDIS_MESSAGE_QUEUE_NAME,
    }),
    AuthModule,
  ],
  controllers: [ProblemController, CompetitionController],
  providers: [ProblemService, CompetitionService, CompetitionGateWay],
})
export class CompetitionModule {}
