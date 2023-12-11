import { byteToKB } from '../index';
import { describe, expect, it } from 'vitest';

describe('byteToKB', () => {
  it('byte를 KB로 변환한다.', () => {
    expect(byteToKB(0)).toBe(0);
    expect(byteToKB(1024)).toBe(1);
    expect(byteToKB(2048)).toBe(2);
    expect(byteToKB(1024 * 1024)).toBe(1024);
  });
});
