import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CompetitionResponseDto {
  constructor(
    id: number,
    name: string,
    detail: string,
    maxParticipants: number,
    startsAt: string,
    endsAt: string,
    problems: number[],
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id;
    this.name = name;
    this.detail = detail;
    this.maxParticipants = maxParticipants;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.problemIds = problems;
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

  static from(args: {
    id: number;
    name: string;
    detail: string;
    maxParticipants: number;
    startsAt: Date;
    endsAt: Date;
    problemIds: number[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    return new CompetitionResponseDto(
      args.id,
      args.name,
      args.detail,
      args.maxParticipants,
      args.startsAt.toISOString(),
      args.endsAt.toISOString(),
      args.problemIds,
      args.createdAt.toISOString(),
      args.updatedAt.toISOString(),
    );
  }
}
