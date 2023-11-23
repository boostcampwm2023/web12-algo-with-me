import { ProblemId } from '@/apis/problems';

export interface SubmitResult {
  contestId: number;
  problemId: number;
  testcaseId: number;
  resultStatus: number;
  elapsedTime: number;
  memoryUsage: number;
}

export type Message = {
  message: string;
};

export type ScoreResult = {
  problemId: ProblemId;
  result: string;
  stdOut: string;
  testcaseId: number;
};
