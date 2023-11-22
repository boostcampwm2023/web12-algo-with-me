import { RESULT } from '../entities/submission.enums';

export class ScoreResultDto {
  constructor(
    submissionId: number,
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
    result: keyof typeof RESULT,
    stdout: string,
    stderr: string,
    timeUsage: number,
    memoryUsage: number,
  ) {
    this.submissionId = submissionId;
    this.competitionId = competitionId;
    this.userId = userId;
    this.problemId = problemId;
    this.testcaseId = testcaseId;
    this.result = result;
    this.stdout = stdout;
    this.stderr = stderr;
    this.timeUsage = timeUsage;
    this.memoryUsage = memoryUsage;
  }

  submissionId: number;
  competitionId: number;
  userId: number;
  problemId: number;
  testcaseId: number;
  result: keyof typeof RESULT;
  stdout: string;
  stderr: string;
  timeUsage: number;
  memoryUsage: number;
}
