export type SimulationInput = {
  id: number;
  input: string;
  expected?: string;
  changable?: boolean;
};

export type SimulationResult = {
  id: number;
  isDone: boolean;
  input: string;
  output: unknown;
};
