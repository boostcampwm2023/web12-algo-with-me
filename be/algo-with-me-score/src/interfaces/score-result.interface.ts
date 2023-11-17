import { RESULT } from '../entities/submission.enums';

interface IScoreResult {
  submissionId: number;
  competitionId: number;
  userId: number;
  problemId: number;
  testcaseNo: number;
  result: keyof typeof RESULT;
  stdout: string | Buffer;
  stderr: string | Buffer;
  timeUsage: number;
  memoryUsage: number;
}

export default IScoreResult;
