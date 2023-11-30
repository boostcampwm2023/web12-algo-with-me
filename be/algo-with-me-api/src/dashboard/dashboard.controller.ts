import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Redis } from 'ioredis';

@ApiTags('대시보드(dashboards)')
@Controller('dashboards')
export class DashboardController {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  @Get('set')
  async setCache() {
    this.redis.zadd('rank', 10, 'kim');
    this.redis.zadd('rank', 20, 'kim');
    this.redis.zadd('rank', 50, 'park');
  }

  @Get('get')
  async getCache() {
    const a = await this.redis.zrange('rank', 0, 100, 'WITHSCORES');
    console.log(a);
    return a;
  }
}
