import { Module } from '@nestjs/common';

import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { ScoreController } from './score/score.controller';
import { ScoreService } from './score/score.service';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [ScoreModule],
  controllers: [AppController, ScoreController],
  providers: [AppService, ScoreService],
})
export class AppModule {}
