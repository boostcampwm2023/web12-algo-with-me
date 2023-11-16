import type { EvalResult } from './types';

type WorkerListener = (args: EvalResult) => void;

const evalWorker = new Worker(new URL('./eval.worker.ts', import.meta.url), {
  type: 'module',
});

let listeners: WorkerListener[] = [];

evalWorker.addEventListener('message', ({ data }) => {
  notify(data);
});

function notify(data: EvalResult) {
  listeners.forEach((l) => l(data));
}

function safeEval(code: string, param: string) {
  const message = {
    code,
    param,
  };

  evalWorker.postMessage(message);
}

function subscribe(listener: WorkerListener) {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export default {
  safeEval,
  subscribe,
};

export * from './types';
