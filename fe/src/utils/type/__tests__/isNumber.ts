import { isNumber } from '../index';
import { describe, expect, it } from 'vitest';

describe('isNumber', () => {
  it('입력값이 숫자라면 true를 반환한다.', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
    expect(isNumber(+1)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(-0)).toBe(true);
    expect(isNumber(+0)).toBe(true);
    expect(isNumber(Number(0))).toBe(true);
  });

  it.each([[''], ['0'], [String('')], [true], [false], [{}], [() => {}]])(
    'isNumber(%s) -> false',
    (input) => {
      expect(isNumber(input)).toBe(false);
    },
  );
});
