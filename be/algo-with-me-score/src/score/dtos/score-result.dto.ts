import { RESULT } from '../entities/submission.enums';

export class ScoreResultDto {
  constructor(
    submissionId: number,
    testcaseId: number,
    socketId: string,
    result: keyof typeof RESULT,
    stdout: string,
    stderr: string,
    timeUsage: number,
    memoryUsage: number,
  ) {
    this.submissionId = submissionId;
    this.testcaseId = testcaseId;
    this.socketId = socketId;
    this.result = result;
    this.stdout = stdout;
    this.stderr = stderr;
    this.timeUsage = timeUsage;
    this.memoryUsage = memoryUsage;
  }

  submissionId: number;
  testcaseId: number;
  socketId: string;
  result: keyof typeof RESULT;
  stdout: string;
  stderr: string;
  timeUsage: number;
  memoryUsage: number;
}
