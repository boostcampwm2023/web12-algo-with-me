import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  Max,
  Min,
} from 'class-validator';

import { Competition } from '../entities/competition.entity';

import { User } from '@src/user/entities/user.entity';

export class CompetitionDto {
  constructor(
    name: string,
    detail: string,
    maxParticipants: number,
    startsAt: string,
    endsAt: string,
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
  @IsInt()
  @Min(1)
  @Max(200)
  maxParticipants: number;

  @ApiProperty({ description: '대회 시작 일시 (ISO string)', type: Date })
  @IsDateString()
  startsAt: string;

  @ApiProperty({ description: '대회 종료 일시 (ISO string)', type: Date })
  @IsDateString()
  endsAt: string;

  @ApiProperty({ description: '대회에 사용되는 문제 id 리스트', type: Number, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(30)
  @ArrayUnique()
  @IsInt({ each: true })
  problemIds: number[];

  toEntity(user: User): Competition {
    const competition = new Competition();
    competition.name = this.name;
    competition.detail = this.detail;
    competition.maxParticipants = this.maxParticipants;
    competition.startsAt = new Date(this.startsAt);
    competition.endsAt = new Date(this.endsAt);
    competition.userId = user.id;
    return competition;
  }
}
