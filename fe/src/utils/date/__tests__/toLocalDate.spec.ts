import { toLocalDate } from '../index';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('toLocalDate', () => {
  beforeEach(() => {
    const spyFn = vi.spyOn(Date.prototype, 'getTimezoneOffset');
    spyFn.mockReturnValue(-9 * 60); // kr 시간 차이만큼 timezoneOffset 설정
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('입력받은 Date를 현재 지역 기준 Date로 변환한다.', () => {
    const date = new Date(2000, 1, 1, 13, 1, 1); // 2000년 2월 1일 13시 1분 1초
    const localDate = toLocalDate(date);
    // ISOString이 9시간 차이나는 것이 아니라 설정한 시간으로 나오게 됨
    expect(localDate.toISOString()).toBe('2000-02-01T13:01:01.000Z');
  });
});
