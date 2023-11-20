import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { RESULT } from '../competition.enums';

export class ScoreResultDto {
  @ApiProperty()
  @IsNotEmpty()
  submissionId: number;

  @ApiProperty()
  @IsNotEmpty()
  problemId: number;

  @ApiProperty()
  @IsNotEmpty()
  testcaseId: number;

  @ApiProperty()
  @IsNotEmpty()
  socketId: string;

  @ApiProperty()
  @IsEnum(RESULT)
  result: string;

  @ApiProperty()
  stdOut: string;
}
