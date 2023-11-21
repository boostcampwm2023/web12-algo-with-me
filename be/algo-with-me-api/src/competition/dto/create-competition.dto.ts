import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Competition } from '@src/competition/entities/competition.entity';

export class CreateCompetitionDto {
  constructor(
    name: string,
    detail: string,
    maxParticipants: number,
    startsAt: string,
    endsAt: string,
  ) {
    this.name = name;
    this.detail = detail;
    this.maxParticipants = maxParticipants;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
  }

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

  toEntity(): Competition {
    const competition = new Competition();
    competition.name = this.name;
    competition.detail = this.detail;
    competition.maxParticipants = this.maxParticipants;
    competition.startsAt = new Date(this.startsAt);
    competition.endsAt = new Date(this.endsAt);
    return competition;
  }
}
