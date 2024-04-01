import { createKey } from '@/utils/lru';
import { LRU } from '@/utils/lru/LRU';
import type { Observer } from '@/utils/observer';
import { isNil } from '@/utils/type';

import type { Evaluator } from './createEvaluator';
import type { EvalMessage, EvalResult, TaskEndMessage } from './types';

export default class EvalTaskManager {
  queuedTasks: EvalMessage[] = [];
  evaluators: Evaluator[] = [];
  taskEndNotifier: Observer<TaskEndMessage>;
  cacheManager: LRU<TaskEndMessage>;

  constructor(
    taskEndNotifier: Observer<TaskEndMessage>,
    evaluators: Evaluator[],
    cacheManager: LRU<TaskEndMessage>,
  ) {
    this.taskEndNotifier = taskEndNotifier;
    this.evaluators = evaluators;
    this.cacheManager = cacheManager;
    this.setupEvaluators();
  }

  getCachedResult(key: string) {
    return this.cacheManager.get(key);
  }

  setCachedResult(key: string, value: TaskEndMessage) {
    this.cacheManager.set(key, value);
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
  receiveTaskEnd(data: EvalResult, evaluator: Evaluator) {
    const resiveResult = {
      ...data,
      task: evaluator.currentTask,
    };

    this.taskEndNotifier.notify(resiveResult);

    if (isNil(evaluator.currentTask)) return;
    const { code, param } = evaluator.currentTask;
    const keyPromise = createKey(code, param);

    keyPromise.then((key) => {
      this.setCachedResult(key, resiveResult);
      evaluator.isIdle = true;
      evaluator.currentTask = null;
      this.deployTask();
    });
  }
  notifyTaskCanceled(task: EvalMessage | null) {
    this.taskEndNotifier.notify({
      result: undefined,
      error: {
        name: 'Error',
        message: '실행 중단',
        stack: '',
      },
      logs: [],
      time: 0,
      startMemory: '',
      endMemory: '',
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
