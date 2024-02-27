import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemController } from './controllers/problem.controller';
import { CompetitionProblem } from './entities/competition.problem.entity';
import { Language } from './entities/language.entity';
import { Problem } from './entities/problem.entity';
import { ProblemLanguage } from './entities/problem.language.entity';
import { ProblemService } from './services/problem.service';
import { Competition } from '../competition/entities/competition.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem, Competition, CompetitionProblem, Language, ProblemLanguage]),
  ],
  controllers: [ProblemController],
  providers: [ProblemService],
})
export class ProblemModule {}
