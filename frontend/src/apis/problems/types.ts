export type ProblemId = number;

export type ProblemInfo = {
  id: ProblemId;
  title: string;
};

export type FetchProblemListResponse = ProblemInfo[];
