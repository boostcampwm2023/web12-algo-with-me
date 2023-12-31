export type EvalMessage = {
  type: 'EVAL';
  clientId: number | string;
  code: string;
  param: string;
};

export type EvalResult = {
  error?: {
    name: string;
    message: string;
    stack: string;
  };
  result: unknown;
  logs: string[];
};

export type TaskEndMessage = EvalResult & { task: EvalMessage | null };
