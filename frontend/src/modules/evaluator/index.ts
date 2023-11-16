import { createObserver, type Listener } from '@/utils/observer';

import EvalWorker from './eval.worker?worker';
import type { EvalMessage, EvalResult } from './types';

const TOTAL_WORKERS = 3;

type Evaluator = {
  isIdle: boolean;
  worker: Worker;
  currentTask: EvalMessage | null;
};
type TaskEndMessage = EvalResult & { task: EvalMessage | null };

const taskEndNotifier = createObserver<TaskEndMessage>();

const evalManager = {
  queuedTasks: [] as EvalMessage[],
  evaluators: [] as Evaluator[],
  addEvaluator(evaluator: Evaluator) {
    this.evaluators.push(evaluator);
  },
  queueTasks(tasks: EvalMessage[]) {
    this.queuedTasks.push(...tasks);
  },
  isWorking() {
    return this.queuedTasks.length > 0;
  },
  popTask() {
    return this.queuedTasks.shift();
  },
  deployTask() {
    const restingEvaluator = this.evaluators.find((evaluator) => evaluator.isIdle);
    if (!restingEvaluator) return;

    const task = this.queuedTasks.shift();
    if (!task) return;

    restingEvaluator.isIdle = false;
    restingEvaluator.currentTask = task;
    restingEvaluator.worker.postMessage(task);

    if (this.queuedTasks.length > 0) {
      this.deployTask();
    }
  },
  receiveTaskEnd({ result }: EvalResult, evaluator: Evaluator) {
    taskEndNotifier.notify({
      result,
      task: evaluator.currentTask,
    });

    evaluator.isIdle = true;
    evaluator.currentTask = null;
    this.deployTask();
  },
};

function init() {
  for (let i = 0; i < TOTAL_WORKERS; i++) {
    const worker = evaluatorFactory.createEvalWorker();
    evalManager.addEvaluator(worker);
  }
}

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

init();

export default {
  safeEval,
  subscribe,
};

export * from './types';
