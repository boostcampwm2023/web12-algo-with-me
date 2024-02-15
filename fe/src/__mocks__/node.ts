import { handlers } from './handlers.js';
import { type SetupServer, setupServer } from 'msw/node';

const server = setupServer(...handlers) as SetupServer;

server.events.on('request:start', ({ request }) => {
  console.log('노드 환경에서 MSW 가동중');
  console.log(`[MSW] ${request.method} ${request.url}`);
});

export { server };
