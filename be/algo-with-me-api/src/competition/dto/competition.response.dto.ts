import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CompetitionResponseDto {
  @ApiProperty({ description: '대회 id' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: '대회 이름' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '대회에 대한 설명글' })
  @IsNotEmpty()
  detail: string;

  @ApiProperty({ description: '대회에 참여 가능한 최대 인원' })
  @IsNotEmpty()
  maxParticipants: number;

  @ApiProperty({ description: '대회 시작 일시 (ISO string)' })
  @IsNotEmpty()
  startsAt: string;

  @ApiProperty({ description: '대회 종료 일시 (ISO string)' })
  @IsNotEmpty()
  endsAt: string;

  @ApiProperty({ description: '레코드 생성 일시 (ISO string)' })
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ description: '레코드 수정 일시 (ISO string)' })
  @IsNotEmpty()
  updatedAt: string;
}
