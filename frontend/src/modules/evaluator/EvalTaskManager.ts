import type { Observer } from '@/utils/observer';

import type { EvalMessage, EvalResult, Evaluator, TaskEndMessage } from './types';

export default class EvalTaskManager {
  queuedTasks: EvalMessage[] = [];
  evaluators: Evaluator[] = [];
  taskEndNotifier: Observer<TaskEndMessage>;

  constructor(taskEndNotifier: Observer<TaskEndMessage>, evaluators: Evaluator[]) {
    this.taskEndNotifier = taskEndNotifier;
    this.evaluators = evaluators;
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
