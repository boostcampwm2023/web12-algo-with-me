import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { GithubStrategy, JWTStrategy } from './auth.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

import { UserModule } from '@src/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: configService.get<string>('JWT_ACCESSTOKEN_EXPIRE_TIME') },
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [GithubStrategy, AuthService, JWTStrategy],
})
export class AuthModule {}
