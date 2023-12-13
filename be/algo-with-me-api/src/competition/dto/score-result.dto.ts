import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { RESULT } from '../competition.enums';

export class ScoreResultDto {
  @ApiProperty()
  @IsNotEmpty()
  submissionId: number;

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
  stdout: string;

  @ApiProperty()
  stderr: string;

  @ApiProperty({ description: 'ms' })
  timeUsage: number;

  @ApiProperty({ description: 'KB' })
  memoryUsage: number;
}
