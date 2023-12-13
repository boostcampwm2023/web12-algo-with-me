import type { EvalMessage } from './types';

export default function createEvalMessage(
  id: string | number,
  code: string,
  param: string,
): EvalMessage {
  return {
    type: 'EVAL',
    clientId: id,
    code,
    param,
  };
}
