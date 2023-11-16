import EvalWorker from './eval.worker?worker';

export default class EvaluatorFactory {
  static createEvaluator() {
    const evaluator = {
      isIdle: true,
      worker: new EvalWorker(),
      currentTask: null,
    };

    return evaluator;
  }
}
