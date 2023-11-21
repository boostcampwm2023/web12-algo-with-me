import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  constructor(email: string, nickname: string) {
    this.email = email;
    this.nickname = nickname;
  }
  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '닉네임' })
  nickname: string;
}
