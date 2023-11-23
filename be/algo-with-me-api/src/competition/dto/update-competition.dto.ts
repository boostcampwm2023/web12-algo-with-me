import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Competition } from '@src/competition/entities/competition.entity';

export class UpdateCompetitionDto {
  constructor(
    name: string,
    detail: string,
    maxParticipants: number,
    startsAt: Date,
    endsAt: Date,
  ) {
    this.name = name;
    this.detail = detail;
    this.maxParticipants = maxParticipants;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
  }

  @ApiProperty({ description: '대회 이름' })
  @Optional()
  name: string;

  @ApiProperty({ description: '대회에 대한 설명글' })
  @Optional()
  detail: string;

  @ApiProperty({ description: '대회에 참여 가능한 최대 인원' })
  @Optional()
  maxParticipants: number;

  @ApiProperty({ description: '대회 시작 일시 (ISO string)' })
  @Optional()
  startsAt: Date;

  @ApiProperty({ description: '대회 종료 일시 (ISO string)' })
  @Optional()
  endsAt: Date;

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
