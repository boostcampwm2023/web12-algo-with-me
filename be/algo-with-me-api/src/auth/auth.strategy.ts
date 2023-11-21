import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['public_profile', 'user:email'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    profile.email = await this.getPrimaryEmail(accessToken);
    return profile;
  }

  async getPrimaryEmail(accessToken: string) {
    const res: Response = await fetch('https://api.github.com/user/emails', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // github에 primary로 등록된 이메일을 가져온다.
    const emails: object[] = await res.json();
    const email = emails.find((element) => {
      if (element['primary']) return element;
    });
    return email['email'];
  }
}
