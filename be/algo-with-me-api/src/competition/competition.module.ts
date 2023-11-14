import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompetitionController } from './competition.controller';
import { CompetitionService } from './competition.service';
import { Problem } from './entities/problem.entity';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';

@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [ProblemController, CompetitionController],
  providers: [ProblemService, CompetitionService],
})
export class CompetitionModule {}
