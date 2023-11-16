import { range } from '@/utils/array';
import { createObserver, type Listener } from '@/utils/observer';

import createEvalMessage from './createEvalMessage';
import createEvaluator from './createEvaluator';
import EvalTaskManager from './EvalTaskManager';
import type { EvalMessage, TaskEndMessage } from './types';

const TOTAL_WORKERS = 3;

const taskEndNotifier = createObserver<TaskEndMessage>();
const evalWorkers = range(0, TOTAL_WORKERS).map(createEvaluator);
const evalManager = new EvalTaskManager(taskEndNotifier, evalWorkers);

function evaluate(tasks: EvalMessage[]) {
  if (evalManager.isWorking()) {
    return false;
  }

  evalManager.queueTasks(tasks);
  evalManager.deployTask();
}

function subscribe(listener: Listener<TaskEndMessage>) {
  taskEndNotifier.subscribe(listener);
}

export default {
  evaluate,
  subscribe,
  createEvalMessage,
};

export * from './types';
