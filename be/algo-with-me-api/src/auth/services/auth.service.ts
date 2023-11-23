import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getGithubPrimaryEmail(accessToken: string): Promise<string> {
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

  verifyToken(token: string) {
    if (!token) throw new UnauthorizedException('토큰을 찾을 수 없습니다.');
    const tokens = token.split(' ');
    if (tokens.length !== 2) throw new UnauthorizedException('토큰의 양식이 올바르지 않습니다.');
    try {
      return this.jwtService.verify(tokens[1]);
    } catch {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }
}
