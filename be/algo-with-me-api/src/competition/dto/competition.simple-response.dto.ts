import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Competition } from '@src/competition/entities/competition.entity';

export class CompetitionSimpleResponseDto {
  constructor(
    id: number,
    name: string,
    detail: string,
    maxParticipants: number,
    participants: number,
    startsAt: string,
    endsAt: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id;
    this.name = name;
    this.detail = detail;
    this.maxParticipants = maxParticipants;
    this.participants = participants;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

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

  @ApiProperty({ description: '대회 참여중인 인원' })
  participants: number;

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

  static from(competition: Competition, participants: number) {
    return new CompetitionSimpleResponseDto(
      competition.id,
      competition.name,
      competition.detail,
      competition.maxParticipants,
      participants,
      competition.startsAt.toISOString(),
      competition.endsAt.toISOString(),
      competition.createdAt.toISOString(),
      competition.updatedAt.toISOString(),
    );
  }
}
