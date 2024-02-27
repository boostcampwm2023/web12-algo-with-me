import { IsNotEmpty } from 'class-validator';

import { Problem } from '../../problem/entities/problem.entity';
import { Submission } from '../entities/submission.entity';

import { User } from '@src/user/entities/user.entity';

export class CreateSubmissionDto {
  @IsNotEmpty()
  problemId: number;

  @IsNotEmpty()
  competitionId: number;

  @IsNotEmpty()
  code: string;

  toEntity(problem: Problem, user: User): Submission {
    const submission = new Submission();
    submission.code = this.code;
    submission.competitionId = this.competitionId;
    submission.problem = problem;
    submission.user = user;
    return submission;
  }
}
