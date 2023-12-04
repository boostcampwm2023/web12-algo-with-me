import { RedisModule } from '@liaoliaots/nestjs-redis';
import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

import { AuthModule } from './auth/auth.module';
import { CompetitionModule } from './competition/competition.module';
import { Competition } from './competition/entities/competition.entity';
import { CompetitionParticipant } from './competition/entities/competition.participant.entity';
import { CompetitionProblem } from './competition/entities/competition.problem.entity';
import { Problem } from './competition/entities/problem.entity';
import { Submission } from './competition/entities/submission.entity';
import { DashboardModule } from './dashboard/dashboard.module';
import { Dashboard } from './dashboard/entities/dashboard.entity';
import { consoleConfig, errorFileConfig, fileConfig } from './log/logger.config';
import { LoggerMiddleware } from './log/logger.middleware';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

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
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(consoleConfig),
        new winstonDaily(fileConfig),
        new winstonDaily(errorFileConfig),
      ],
    }),
    CompetitionModule,
    AuthModule,
    UserModule,
    DashboardModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
