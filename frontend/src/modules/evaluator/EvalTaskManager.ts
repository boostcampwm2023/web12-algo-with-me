import type { Observer } from '@/utils/observer';

import type { Evaluator } from './createEvaluator';
import type { EvalMessage, EvalResult, TaskEndMessage } from './types';

export default class EvalTaskManager {
  queuedTasks: EvalMessage[] = [];
  evaluators: Evaluator[] = [];
  taskEndNotifier: Observer<TaskEndMessage>;

  constructor(taskEndNotifier: Observer<TaskEndMessage>, evaluators: Evaluator[]) {
    this.taskEndNotifier = taskEndNotifier;
    this.evaluators = evaluators;

    this.evaluators.forEach((evaluator) => {
      const { worker } = evaluator;
      const handleWorkerMessage = ({ data }: MessageEvent<EvalResult>) => {
        this.receiveTaskEnd(data, evaluator);
      };
      worker.addEventListener('message', handleWorkerMessage);
    });
  }

  queueTasks(tasks: EvalMessage[]) {
    this.queuedTasks.push(...tasks);
  }
  isWorking() {
    return this.queuedTasks.length > 0;
  }
  popTask() {
    return this.queuedTasks.shift();
  }
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
  }
  receiveTaskEnd({ result }: EvalResult, evaluator: Evaluator) {
    this.taskEndNotifier.notify({
      result,
      task: evaluator.currentTask,
    });

    evaluator.isIdle = true;
    evaluator.currentTask = null;
    this.deployTask();
  }
}
