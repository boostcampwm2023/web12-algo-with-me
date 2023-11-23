import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompetitionController } from './controllers/competition.controller';
import { ProblemController } from './controllers/problem.controller';
import { CompetitionProblem } from './entities/competition.problem.entity';
import { CompetitionParticipant } from './entities/competition.participant.entity';
import { Problem } from './entities/problem.entity';
import { Submission } from './entities/submission.entity';
import { CompetitionGateWay } from './gateways/competition.gateway';
import { CompetitionService } from './services/competition.service';
import { ProblemService } from './services/problem.service';
import { SubmissionConsumer } from './tem.consumer';

import { Competition } from '@src/competition/entities/competition.entity';
import { User } from '@src/user/entities/user.entity';

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
      name: process.env.REDIS_MESSAGE_QUEUE_NAME,
    }),
  ],
  controllers: [ProblemController, CompetitionController],
  providers: [ProblemService, CompetitionService, SubmissionConsumer, CompetitionGateWay],
})
export class CompetitionModule {}
