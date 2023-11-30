import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class DashboardService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  register(competitionId: number, email: string) {}
}
