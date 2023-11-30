import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import { config } from 'dotenv';

import { AuthModule } from './auth/auth.module';
import { CompetitionModule } from './competition/competition.module';
import { CompetitionParticipant } from './competition/entities/competition.participant.entity';
import { CompetitionProblem } from './competition/entities/competition.problem.entity';
import { Problem } from './competition/entities/problem.entity';
import { Submission } from './competition/entities/submission.entity';
import { Dashboard } from './dashboard/entities/dashboard.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

import { Competition } from '@src/competition/entities/competition.entity';

config();

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
      synchronize: true,
      entities: [
        Problem,
        Submission,
        Competition,
        User,
        CompetitionProblem,
        CompetitionParticipant,
        Dashboard,
      ],
      logging: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    CompetitionModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
