import { ApiProperty } from '@nestjs/swagger';

export class IsJoinableDto {
  constructor(isJoinable: boolean, message?: string) {
    this.isJoinable = isJoinable;
    this.message = message;
  }

  @ApiProperty({ description: 'true 면 입장 가능, false 면 입장 불가능' })
  isJoinable: boolean;

  @ApiProperty({ description: '입장 불가능일 경우 사유' })
  message?: string;
}
