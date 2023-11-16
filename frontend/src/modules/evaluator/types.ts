export type EvalMessage = {
  type: 'EVAL';
  code: string;
  param: string;
};

export type EvalResult = {
  result: unknown;
};
