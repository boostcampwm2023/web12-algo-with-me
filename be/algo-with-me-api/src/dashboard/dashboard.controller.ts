import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Redis } from 'ioredis';

import { DashboardService } from './dashboard.service';

import { RESULT } from '@src/competition/competition.enums';

@ApiTags('대시보드(dashboards)')
@Controller('dashboards')
export class DashboardController {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly dashboardService: DashboardService,
  ) {}

  @ApiOperation({ summary: '[백엔드 테스트용] redis set 테스트' })
  @Get('set')
  async setCache(competitionId: number, email: string) {
    competitionId = 1;
    email = 'dhdgn@naver.com';
    this.redis.zadd(`competition:${competitionId}`, 10, email);
    this.redis.zadd(`competition:${competitionId}`, 5, 'qwer');
  }

  @ApiOperation({ summary: '[백엔드 테스트용] redis get 테스트' })
  @Get('get')
  async getCache() {
    const a = await this.redis.zrange('rank', 0, 100, 'WITHSCORES');
    // console.log(a);
    console.log(await this.redis.zrank('competition:1', 'dhdgn@naver.com'));
    const [b, c] = await this.redis
      .multi()
      .zrank('competition:1', 'dhdgn@naver.com')
      .zscore('competition:1', 'dhdgn@naver.com')
      .exec();
    console.log(b, c);
    return a;
  }

  @ApiOperation({ summary: '[백엔드 테스트용] redis 대회 참가, 수정, 대시보드 조회 테스트' })
  @Get('')
  async getDashboard() {
    await this.dashboardService.registerUserAtCompetition(2, 'dhdgn@naver.com');
    await this.dashboardService.registerUserAtCompetition(2, 'qwer@naver.com');
    await this.dashboardService.updateUserSubmission(
      2,
      1,
      'qwer@naver.com',
      RESULT.CORRECT,
      new Date(),
    );
    await this.dashboardService.getTop100Dashboard(2, 'dhdgn@naver.com');
  }
}
