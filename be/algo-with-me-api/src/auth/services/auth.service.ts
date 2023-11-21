import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

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
}
