import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Competition } from '../entities/competition.entity';

import { User } from '@src/user/entities/user.entity';

export class CreateCompetitionDto {
  constructor(
    name: string,
    detail: string,
    maxParticipants: number,
    startsAt: Date,
    endsAt: Date,
    problemIds: number[],
  ) {
    this.name = name;
    this.detail = detail;
    this.maxParticipants = maxParticipants;
    this.problemIds = problemIds;
    this.endsAt = endsAt;
    this.startsAt = startsAt;
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
  startsAt: Date;

  @ApiProperty({ description: '대회 종료 일시 (ISO string)' })
  @IsNotEmpty()
  endsAt: Date;

  @ApiProperty({ description: '대회에 사용되는 문제 id 리스트' })
  @IsNotEmpty()
  problemIds: number[];

  toEntity(user: User): Competition {
    const competition = new Competition();
    competition.name = this.name;
    competition.detail = this.detail;
    competition.maxParticipants = this.maxParticipants;
    competition.startsAt = this.startsAt;
    competition.endsAt = this.endsAt;
    competition.user = user;
    competition.userId = user.id;
    return competition;
  }
}
