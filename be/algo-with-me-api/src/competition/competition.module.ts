import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompetitionController } from './controllers/competition.controller';
import { ProblemController } from './controllers/problem.controller';
import { Problem } from './entities/problem.entity';
import { Submission } from './entities/submission.entity';
import { CompetitionService } from './services/competition.service';
import { ProblemService } from './services/problem.service';
import { SubmissionConsumer } from './tem.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Submission]),
    BullModule.registerQueue({
      name: process.env.REDIS_MESSAGE_QUEUE_NAME,
    }),
  ],
  controllers: [ProblemController, CompetitionController],
  providers: [ProblemService, CompetitionService, SubmissionConsumer],
})
export class CompetitionModule {}
