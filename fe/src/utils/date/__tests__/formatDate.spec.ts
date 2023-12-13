import { formatDate } from '../index';
import { describe, expect, it } from 'vitest';

describe('formatDate', () => {
  it('YYYY-MM-DDThh:mm 형식의 문자열을 반환한다.', () => {
    const now = new Date(2000, 1, 1, 13, 1, 1);
    const dateStr = formatDate(now, 'YYYY-MM-DDThh:mm');

    expect(dateStr).toBe('2000-02-01T04:01');
  });

  it('일치하는 형식이 없으면 빈 문자열을 반환한다.', () => {
    const now = new Date(2000, 1, 1, 13, 1, 1);
    const dateStr = formatDate(now, '??');

    expect(dateStr).toBe('');
  });
});
