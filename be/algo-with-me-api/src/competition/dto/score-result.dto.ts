import { IsEnum, IsNotEmpty } from 'class-validator';

import { RESULT } from '../competition.enums';

export class ScoreResultDto {
  @IsNotEmpty()
  submissionId: number;

  @IsNotEmpty()
  problemId: number;

  @IsNotEmpty()
  testcaseId: number;

  @IsNotEmpty()
  socketId: string;

  @IsEnum(RESULT)
  result: string;

  stdOut: string;
}
