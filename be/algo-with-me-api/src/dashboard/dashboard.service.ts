import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class DashboardService {
  COMPETITION = 'competition';
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async register(competitionId: number, email: string) {
    const key: string = `${this.COMPETITION}:${competitionId}`;
    const num: number | null = await this.redis.zrank(key, email);
    if (num === null) await this.redis.zadd(key, 0, email);
  }
}
