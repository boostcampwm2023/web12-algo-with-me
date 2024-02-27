import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Problem } from '../entities/problem.entity';

export class CreateProblemDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  timeLimit: number;

  @ApiProperty()
  @IsNotEmpty()
  memoryLimit: number;

  @ApiProperty()
  @IsNotEmpty()
  testcaseNum: number;

  @ApiProperty()
  @IsNotEmpty()
  frameCode: string;

  @ApiProperty()
  @IsNotEmpty()
  solutionCode: string;

  toEntity(): Problem {
    const problem = new Problem();
    problem.title = this.title;
    problem.timeLimit = this.timeLimit;
    problem.memoryLimit = this.memoryLimit;
    problem.testcaseNum = this.testcaseNum;
    problem.frameCode = this.frameCode;
    problem.solutionCode = this.solutionCode;
    return problem;
  }
}
