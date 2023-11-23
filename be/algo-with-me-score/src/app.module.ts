import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as process from 'node:process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Competition } from './score/entities/competition.entity';
import { CompetitionParticipant } from './score/entities/competition.participant.entity';
import { CompetitionProblem } from './score/entities/competition.problem.entity';
import { Problem } from './score/entities/problem.entity';
import { Submission } from './score/entities/submission.entity';
import { User } from './score/entities/user.entity';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      entities: [
        Competition,
        Submission,
        Problem,
        User,
        CompetitionProblem,
        CompetitionParticipant,
      ],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: process.env.REDIS_MESSAGE_QUEUE_NAME,
    }),
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
