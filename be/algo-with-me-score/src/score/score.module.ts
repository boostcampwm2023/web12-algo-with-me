import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Competition } from './entities/competition.entity';
import { CompetitionProblem } from './entities/competition.problem.entity';
import { Problem } from './entities/problem.entity';
import { Submission } from './entities/submission.entity';
import { FilesystemService } from './services/filesystem.service';
import { SubmissionConsumer } from './services/score.consumer';
import { ScoreService } from './services/score.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Competition, CompetitionProblem, Submission, Problem]),
    BullModule.registerQueue({
      name: process.env.REDIS_MESSAGE_QUEUE_NAME,
    }),
  ],
  controllers: [],
  providers: [SubmissionConsumer, FilesystemService, ScoreService],
})
export class ScoreModule {}
