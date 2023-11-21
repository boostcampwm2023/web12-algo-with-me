import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CompetitionModule } from './competition/competition.module';
import { Problem } from './competition/entities/problem.entity';
import { Submission } from './competition/entities/submission.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

import { Competition } from '@src/competition/entities/competition.entity';

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
      entities: [Problem, Submission, Competition, User],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    CompetitionModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
