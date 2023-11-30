import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Redis } from 'ioredis';

@ApiTags('대시보드(dashboards)')
@Controller('dashboards')
export class DashboardController {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  @Get('set')
  async setCache(competitionId: number, email: string) {
    competitionId = 1;
    email = 'dhdgn@naver.com';
    this.redis.zadd(`competition:${competitionId}`, 10, email);
    this.redis.zadd(`competition:${competitionId}`, 5, 'qwer');
  }

  @Get('get')
  async getCache() {
    const a = await this.redis.zrange('rank', 0, 100, 'WITHSCORES');
    console.log(a);
    console.log(await this.redis.zrank('competition:1', 'dhdgn@naver.com'));
    console.log(await this.redis.zrank('competition:1', 'qwer'));
    console.log(await this.redis.zrank('competition:1', 'abcd'));
    return a;
  }
}
