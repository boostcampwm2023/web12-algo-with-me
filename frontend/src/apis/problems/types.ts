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
  testcases: string[];
  createdAt: string;
};

export type FetchProblemListResponse = ProblemInfo[];
export type FetchCompetitionProblemResponse = CompetitionProblem;
