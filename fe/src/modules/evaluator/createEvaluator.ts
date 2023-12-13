import EvalWorker from './eval.worker?worker';
import { EvalMessage } from './types';

export type Evaluator = {
  isIdle: boolean;
  worker: Worker;
  currentTask: EvalMessage | null;
};

const createEvaluator = () => {
  const evaluator: Evaluator = {
    isIdle: true,
    worker: new EvalWorker(),
    currentTask: null,
  };

  return evaluator;
};

export default createEvaluator;
