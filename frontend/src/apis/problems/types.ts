import type { SimulationInput } from '@/hooks/simulation';

export type ProblemId = number;

export type ProblemInfo = {
  id: ProblemId;
  title: string;
};

export type CompetitionProblem = {
  id: ProblemId;
  title: string;
  timeLimit: number;
  memoryLimit: number;
  content: string;
  solutionCode: string;
  testcases: SimulationInput[];
  createdAt: string;
};

export type FetchProblemListResponse = ProblemInfo[];
export type FetchCompetitionProblemResponse = CompetitionProblem;
