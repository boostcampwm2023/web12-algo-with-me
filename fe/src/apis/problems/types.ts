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

export interface TestcaseDataDictionary {
  input: InputType[];
  output: ValueType;
}

export interface Testcase {
  data: TestcaseDataDictionary[];
  input: TestcaseBaseDictionary[];
  output: TestcaseBaseDictionary;
}

export type LangaugeType = 'Python' | 'JavaScript';

export type SolutionCode = Partial<Record<LangaugeType, string>>;

export type FetchCompetitionProblemResponse = {
  id: ProblemId;
  title: string;
  timeLimit: number;
  memoryLimit: number;
  content: string;
  solutionCode: SolutionCode;
  testcases: Testcase;
  createdAt: string;
};

export type CompetitionProblem = {
  id: ProblemId;
  title: string;
  timeLimit: number;
  memoryLimit: number;
  content: string;
  solutionCode: SolutionCode;
  testcases: SimulationInput[];
  createdAt: string;
};

export type FetchProblemListResponse = ProblemInfo[];
