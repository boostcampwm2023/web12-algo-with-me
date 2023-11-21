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

  return true;
}

function cancelEvaluation() {
  evalWorkers.forEach(({ worker }) => worker.terminate());
  evalManager.cancelTasks();

  const newEvalWorkers = range(0, TOTAL_WORKERS).map(createEvaluator);
  evalManager.setNewWorkers(newEvalWorkers);
}

function subscribe(listener: Listener<TaskEndMessage>) {
  taskEndNotifier.subscribe(listener);
}

export default {
  evaluate,
  cancelEvaluation,
  subscribe,
  createEvalMessage,
};

export * from './types';
