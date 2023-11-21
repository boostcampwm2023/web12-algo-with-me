export type SimulationInput = {
  id: number;
  input: string;
};

export type SimulationResult = {
  id: number;
  isDone: boolean;
  input: string;
  output: unknown;
};
