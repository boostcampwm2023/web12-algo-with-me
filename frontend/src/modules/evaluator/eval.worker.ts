import evalCode from './evalCode';
import type { EvalMessage } from './types';

type MessageEvent = {
  data: EvalMessage;
};

self.addEventListener('message', async function (e: MessageEvent) {
  const message = e.data;

  try {
    const { code, param } = message;
    const result = evalCode(code, param);

    self.postMessage(result);
  } catch (err) {
    self.postMessage(err);
  }
});
