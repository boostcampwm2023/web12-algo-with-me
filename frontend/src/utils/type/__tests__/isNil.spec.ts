import { isNil } from '../index';
import { describe, expect, it } from 'vitest';

describe('isNil', () => {
  it('null 또는 undefined라면 true를 반환한다.', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it.each([[''], ['a'], [+0], [-0], [0], [1], [Number(0)], [String('')], [true], [false], [{}]])(
    'isNil(%s) -> false',
    (input) => {
      expect(isNil(input)).toBe(false);
    },
  );
});
