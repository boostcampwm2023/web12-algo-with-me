import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemController } from './controllers/problem.controller';
import { CompetitionProblem } from './entities/competition.problem.entity';
import { Problem } from './entities/problem.entity';
import { ProblemService } from './services/problem.service';
import { Competition } from '../competition/entities/competition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Problem,
      //   Submission,
      Competition,
      CompetitionProblem,
      //   CompetitionParticipant,
      //   User,
    ]),
    // BullModule.registerQueue({
    //   name: 'submission',
    // }),
    // AuthModule,
    // UserModule,
    // forwardRef(() => DashboardModule),
  ],
  controllers: [ProblemController],
  providers: [ProblemService],
})
export class ProblemModule {}
