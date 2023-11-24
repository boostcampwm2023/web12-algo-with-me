import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Competition } from './entities/competition.entity';
import { CompetitionParticipant } from './entities/competition.participant.entity';
import { CompetitionProblem } from './entities/competition.problem.entity';
import { Problem } from './entities/problem.entity';
import { Submission } from './entities/submission.entity';
import { User } from './entities/user.entity';
import { FilesystemService } from './services/filesystem.service';
import { SubmissionConsumer } from './services/score.consumer';
import { ScoreService } from './services/score.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Competition,
      Submission,
      Problem,
      User,
      CompetitionProblem,
      CompetitionParticipant,
    ]),
  ],
  controllers: [],
  providers: [SubmissionConsumer, FilesystemService, ScoreService],
})
export class ScoreModule {}
