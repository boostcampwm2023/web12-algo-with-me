import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Competition } from '../entities/competition.entity';

export class CompetitionResponseDto {
  constructor(
    id: number,
    host: string,
    participants: string[],
    name: string,
    detail: string,
    maxParticipants: number,
    startsAt: string,
    endsAt: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id;
    this.host = host;
    this.participants = participants;
    this.name = name;
    this.detail = detail;
    this.maxParticipants = maxParticipants;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @ApiProperty({ description: '대회 id' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: '주최자 이메일' })
  @IsNotEmpty()
  host: string;

  @ApiProperty({ description: '참가자 이메일' })
  participants: string[];

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

  @ApiProperty({ description: '대회에 사용되는 문제 id 리스트' })
  @IsNotEmpty()
  problemIds: number[];

  @ApiProperty({ description: '레코드 생성 일시 (ISO string)' })
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ description: '레코드 수정 일시 (ISO string)' })
  @IsNotEmpty()
  updatedAt: string;

  static from(competition: Competition, host: string, competitionParticipants: string[]) {
    return new CompetitionResponseDto(
      competition.id,
      host,
      competitionParticipants,
      competition.name,
      competition.detail,
      competition.maxParticipants,
      competition.startsAt.toISOString(),
      competition.endsAt.toISOString(),
      competition.createdAt.toISOString(),
      competition.updatedAt.toISOString(),
    );
  }
}
