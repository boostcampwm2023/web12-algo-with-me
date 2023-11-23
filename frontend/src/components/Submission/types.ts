import { ProblemId } from '@/apis/problems';

export const SUBMIT_STATE = {
  notSubmitted: 0,
  loading: 1,
  submitted: 2,
} as const;

export type SubmitState = (typeof SUBMIT_STATE)[keyof typeof SUBMIT_STATE];

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
