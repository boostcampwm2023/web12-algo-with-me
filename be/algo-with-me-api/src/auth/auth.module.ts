import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { GithubStrategy } from './auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [GithubStrategy],
})
export class AuthModule {}
