import { range } from '@/utils/array';
import { createObserver, type Listener } from '@/utils/observer';

import EvalTaskManager from './EvalTaskManager';
import EvaluatorFactory from './EvaluatorFactory';
import type { EvalMessage, TaskEndMessage } from './types';

const TOTAL_WORKERS = 3;

const taskEndNotifier = createObserver<TaskEndMessage>();
const evalWorkers = range(0, TOTAL_WORKERS).map(() => EvaluatorFactory.createEvaluator());
const evalManager = new EvalTaskManager(taskEndNotifier, evalWorkers);

function safeEval(tasks: EvalMessage[]) {
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
  safeEval,
  subscribe,
};

export * from './types';
