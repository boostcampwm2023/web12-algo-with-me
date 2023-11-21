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

    this.setupEvaluators();
  }

  setupEvaluators() {
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
    const hasTask = this.queuedTasks.length > 0;
    const hasWorkingEvaluator = this.evaluators.some((evaluator) => !evaluator.isIdle);

    return hasTask || hasWorkingEvaluator;
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
  receiveTaskEnd({ result, error }: EvalResult, evaluator: Evaluator) {
    this.taskEndNotifier.notify({
      result,
      error,
      task: evaluator.currentTask,
    });

    evaluator.isIdle = true;
    evaluator.currentTask = null;
    this.deployTask();
  }
  notifyTaskCanceled(task: EvalMessage | null) {
    this.taskEndNotifier.notify({
      result: undefined,
      error: {
        name: 'Error',
        message: '실행 중단',
        stack: '',
      },
      task,
    });
  }
  cancelTasks() {
    const readyTasks = [...this.queuedTasks];
    const workingTasks = this.evaluators.map(({ currentTask }) => currentTask);

    [...readyTasks, ...workingTasks].forEach((task) => {
      this.notifyTaskCanceled(task);
    });
    this.queuedTasks = [];
  }
  setNewWorkers(evaluators: Evaluator[]) {
    this.evaluators = evaluators;
    this.setupEvaluators();
  }
}
