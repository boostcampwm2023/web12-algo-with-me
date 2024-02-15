import { server } from './src/__mocks__/node';
import { storage } from './src/utils/test/localStorage';
import { afterAll, afterEach, beforeAll } from 'vitest';

beforeAll(() => {
  globalThis.localStorage = storage();
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
