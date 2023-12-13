import { deepCopy } from '../index';
import { describe, expect, it } from 'vitest';

describe('deepCopy', () => {
  it('deepCopy는 객체를 깊은 복사한다.', () => {
    const obj = {
      inner: {
        a: 1,
      },
    };
    expect(deepCopy(obj)).not.equal(obj);
    expect(deepCopy(obj).inner).not.equal(obj.inner);
  });

  it('deepCopy는 배열을 깊은 복사한다.', () => {
    const obj = { inner: { a: 1 } };
    const arr = [obj];
    expect(deepCopy(arr)).not.equal(arr);
    expect(deepCopy(arr)[0]).not.equal(arr[0]);
    expect(deepCopy(arr)[0].inner).not.equal(obj.inner);
  });
});
