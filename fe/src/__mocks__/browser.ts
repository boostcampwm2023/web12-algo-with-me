import { handlers } from './handlers';
import { type SetupWorker, setupWorker } from 'msw/browser';

const worker = setupWorker(...handlers) as SetupWorker;

worker.events.on('request:start', ({ request }) => {
  console.log(`[MSW] ${request.method} ${request.url}`);
});

export { worker };
