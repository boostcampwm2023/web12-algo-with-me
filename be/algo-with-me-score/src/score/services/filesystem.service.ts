import fs from 'node:fs';
import process from 'process';

import { Submission } from '../entities/submission.entity';

export class FilesystemService {
  public writeSubmittedCode(
    competitionId: number,
    userId: number,
    problemId: number,
    submission: Submission,
  ) {
    const mergedCode = this.getMergedCode(submission.code, submission.problem.frameCode);
    fs.writeFileSync(
      `${process.env.SUBMISSION_PATH}/${competitionId}/${userId}/${problemId}`,
      mergedCode,
    );
  }

  private getMergedCode(code: string, frameCode: string) {
    const mergedCode = code + frameCode;
    return mergedCode;
  }
}
