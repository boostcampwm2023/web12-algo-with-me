export type EvalMessage = {
  type: 'EVAL';
  requestIndex: number;
  code: string;
  param: string;
};

export type EvalResult = {
  result: unknown;
};
