import { IsNotEmpty } from 'class-validator';

import { Problem } from '../entities/problem.entity';

export class CreateProblemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  timeLimit: number;

  @IsNotEmpty()
  memoryLimit: number;

  @IsNotEmpty()
  testcaseNum: number;

  @IsNotEmpty()
  frameCode: string;

  toEntity(): Problem {
    const problem = new Problem();
    problem.title = this.title;
    problem.timeLimit = this.timeLimit;
    problem.memoryLimit = this.memoryLimit;
    problem.testcaseNum = this.testcaseNum;
    problem.frameCode = this.frameCode;
    return problem;
  }
}
