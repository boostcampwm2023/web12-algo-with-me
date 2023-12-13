import type { SimulationInput } from '@/hooks/simulation';

export type ProblemId = number;
export type Problem = {
  id: number;
  title: string;
  timeLimit: number;
  memoryLimit: number;
  content: string;
  createdAt: string;
};
export type ProblemInfo = {
  id: ProblemId;
  title: string;
};
interface TestcaseBaseDictionary {
  name: string;
  type: string;
}

type ValueType = 'string' | 'number' | 'boolean';

type InputType = ValueType | ValueType[] | ValueType[][];

interface TestcaseDataDictionary {
  input: InputType[];
  output: ValueType;
}

export interface Testcase {
  data: TestcaseDataDictionary[];
  input: TestcaseBaseDictionary[];
  output: TestcaseBaseDictionary;
}

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
