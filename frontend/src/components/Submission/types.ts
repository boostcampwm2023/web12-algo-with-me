import { ProblemId } from '@/apis/problems';

export const SUBMIT_STATE = {
  notSubmitted: 0,
  loading: 1,
  submitted: 2,
} as const;

export type SubmitState = (typeof SUBMIT_STATE)[keyof typeof SUBMIT_STATE];

export type ScoreStart = {
  message: string;
  testcaseNum: number;
};

export type ScoreResult = {
  problemId: ProblemId;
  result: string;
  stdout: string;
};

export type SubmitResult = {
  testcaseId: number;
  submitState: SubmitState;
  score?: ScoreResult;
};
