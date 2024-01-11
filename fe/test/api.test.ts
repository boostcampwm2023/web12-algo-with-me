import axios from 'axios';
import { test } from 'vitest';

test('adds 1 + 2 to equal 3', () => {
  axios.get('/test').then((res) => console.log(res, '???'));
});
