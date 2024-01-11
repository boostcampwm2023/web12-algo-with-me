import { handlers } from './handlers.js';
import { type SetupServer, setupServer } from 'msw/node';

const server = setupServer(...handlers) as SetupServer;

server.events.on('request:start', ({ request }) => {
  console.log(`[MSW] ${request.method} ${request.url}`);
});

export { server };
