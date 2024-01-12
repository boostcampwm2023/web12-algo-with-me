import { fetchTokenValid } from '@/apis/auth/index';

import { test } from 'vitest';

test('token Valid test', () => {
  fetchTokenValid('a');
});
