import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScoreController } from './score/score.controller';
import { ScoreModule } from './score/score.module';
import { ScoreService } from './score/score.service';
import { typeORMConfig } from './typeorm.config';

@Module({
  imports: [ScoreModule, TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class AppModule {}
