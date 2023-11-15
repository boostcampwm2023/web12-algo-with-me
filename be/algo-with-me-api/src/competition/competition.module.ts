import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompetitionController } from './controllers/competition.controller';
import { ProblemController } from './controllers/problem.controller';
import { Problem } from './entities/problem.entity';
import { CompetitionService } from './services/competition.service';
import { ProblemService } from './services/problem.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem]),
    BullModule.registerQueue({
      name: process.env.REDIS_MESSAGE_QUEU_NAME,
    }),
  ],
  controllers: [ProblemController, CompetitionController],
  providers: [ProblemService, CompetitionService],
})
export class CompetitionModule {}
