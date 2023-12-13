import { range } from '..';
import { describe, expect, it } from 'vitest';

describe('range', () => {
  it.each([
    [0, 0, 1, []],
    [0, 5, 1, [0, 1, 2, 3, 4]],
    [1, 3, 1, [1, 2]],
    [0, 10, 2, [0, 2, 4, 6, 8]],
  ])('%s ~ %s 까지 %s(default 1) 만큼 증가하는 배열을 반환한다.', (start, end, gap, expected) => {
    expect(range(start, end, gap)).toEqual(expected);
  });
});
