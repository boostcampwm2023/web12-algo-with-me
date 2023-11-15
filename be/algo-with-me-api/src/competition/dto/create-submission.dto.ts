import { IsNotEmpty } from 'class-validator';

import { Problem } from '../entities/problem.entity';
import { Submission } from '../entities/submission.entity';

export class CreateSubmissionDto {
  @IsNotEmpty()
  problemId: number;

  @IsNotEmpty()
  code: string;

  toEntity(problem: Problem): Submission {
    const submission = new Submission();
    submission.problem = problem;
    submission.code = this.code;
    return submission;
  }
}
