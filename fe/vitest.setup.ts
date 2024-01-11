import { server } from './src/__mocks__/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
