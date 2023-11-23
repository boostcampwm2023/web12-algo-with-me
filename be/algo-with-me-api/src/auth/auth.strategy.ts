import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';

import { AuthService } from './services/auth.service';

import { UserResponseDto } from '@src/user/dto/user.response.dto';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/services/user.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['public_profile', 'user:email'],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(accessToken: string, _refreshToken: string, _profile: Profile) {
    const email: string = await this.authService.getGithubPrimaryEmail(accessToken);
    const user: UserResponseDto = await this.userService.saveOrGetByEmail(email);
    return user;
  }
}

@Injectable()
export class JWTStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(
    private readonly configservice: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configservice.get<string>('JWT_SECRET'),
    });
  }

  async validate(content: any): Promise<User> {
    // user가 null이면 인가 실패
    return this.userService.getByEmail(content.sub);
  }
}
