import { createObserver, type Listener } from '@/utils/observer';

import EvalWorker from './eval.worker?worker';
import EvalTaskManager from './EvalTaskManager';
import type { EvalMessage, EvalResult, TaskEndMessage } from './types';

const TOTAL_WORKERS = 3;

const evaluatorFactory = {
  createEvalWorker() {
    const evaluator = {
      isIdle: true,
      worker: new EvalWorker(),
      currentTask: null,
    };

    evaluator.worker.addEventListener('message', function (msg: MessageEvent<EvalResult>) {
      const { data } = msg;

      evalManager.receiveTaskEnd(data, evaluator);
    });

    return evaluator;
  },
};
const taskEndNotifier = createObserver<TaskEndMessage>();
const evalWorkers = Array(TOTAL_WORKERS)
  .fill(undefined)
  .map(() => evaluatorFactory.createEvalWorker());
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
