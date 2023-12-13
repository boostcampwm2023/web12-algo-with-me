import { isFunction } from '../index';
import { describe, expect, it } from 'vitest';

describe('isFunction', () => {
  it('함수라면 true를 반환한다.', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(function abc() {})).toBe(true);
    expect(
      isFunction(function abc(arg1: number, arg2: string) {
        return arg1 + arg2;
      }),
    ).toBe(true);
  });

  it.each([[''], ['a'], [+0], [-0], [0], [1], [Number(0)], [String('')], [true], [false], [{}]])(
    'isFunction(%s) -> false',
    (input) => {
      expect(isFunction(input)).toBe(false);
    },
  );
});
