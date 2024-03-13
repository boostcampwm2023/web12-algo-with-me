import * as QuickJS from './quickjs';
import type { EvalMessage } from './types';

type MessageEvent = {
  data: EvalMessage;
};

self.addEventListener('message', async function (e: MessageEvent) {
  const message = e.data;

  try {
    const { code, param } = message;
    const result = await QuickJS.evaluate(code, param);
    self.postMessage(result);
  } catch (err) {
    self.postMessage(err);
  }
});
