import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisCache } from 'cache-manager-redis-yet';

@ApiTags('대시보드(dashboards)')
@Controller('dashboards')
export class DashboardController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {}

  @Get('set')
  async setCache() {
    this.cacheManager.store
    this.cacheManager.set('key', 'value', 5000);
  }

  @Get('get')
  async getCache() {
    const a = await this.cacheManager.get('key');
    console.log(a);
    return a;
  }
}
