import { IsNotEmpty } from 'class-validator';

import { Problem } from '../../problem/entities/problem.entity';
import { LANGUAGES, getLanguageIdByName } from '../../problem/language.enums';
import { User } from '../../user/entities/user.entity';
import { Submission } from '../entities/submission.entity';

export class CreateSubmissionDto {
  @IsNotEmpty()
  problemId: number;

  @IsNotEmpty()
  competitionId: number;

  @IsNotEmpty()
  language: keyof typeof LANGUAGES;

  @IsNotEmpty()
  code: string;

  toEntity(problem: Problem, user: User): Submission {
    const submission = new Submission();
    submission.code = this.code;
    submission.competitionId = this.competitionId;
    submission.languageId = getLanguageIdByName(this.language);
    submission.problem = problem;
    submission.user = user;
    return submission;
  }
}
