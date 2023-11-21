import { Module } from '@nestjs/common';

import { GithubStrategy } from './auth.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

import { UserModule } from '@src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [GithubStrategy, AuthService],
})
export class AuthModule {}
