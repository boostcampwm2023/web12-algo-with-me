import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './auth.strategy';

@Module({
  controllers: [AuthController],
  providers: [GithubStrategy, AuthService],
})
export class AuthModule {}
