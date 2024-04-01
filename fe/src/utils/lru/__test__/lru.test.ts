import { LRU } from '../LRU';
import { describe, expect, test } from 'vitest';

function linkedPrint(arr: number[]) {
  const copy = [...arr];
  return copy.reverse().join('->');
}
function mapPrint(arr: number[]) {
  return arr.join(',');
}

describe('LRU를 인스턴스화 할 수 있다.', () => {
  test('LRU 인스턴스화', () => {
    const lru = new LRU(3);
    expect(lru).toBeInstanceOf(LRU);
    expect(lru.maxSize).toBe(3);
  });
});

describe('LRU에 데이터를 넣으면 최신순으로 들어간다.', () => {
  test('최대 캐싱 크기보다 적게 넣기', () => {
    const lru = new LRU(3);
    const origin = [1, 2, 3];
    const remain = [1, 2, 3];
    for (const num of origin) {
      lru.set(num, num);
    }

    expect(lru.toLinkedListString()).toBe(linkedPrint(remain));
    expect(lru.toMapString()).toBe(mapPrint(remain));
  });

  test('최대 캐싱 크기보다 크게 넣기', () => {
    const lru = new LRU(3);
    const origin = [1, 2, 3, 4, 5];
    const remain = [3, 4, 5];
    for (const num of origin) {
      lru.set(num, num);
    }

    expect(lru.toLinkedListString()).toBe(linkedPrint(remain));
    expect(lru.toMapString()).toBe(mapPrint(remain));
  });
});

describe('LRU의 get을 이용하면 캐싱되던 값을 최신화 한다.', () => {
  test('캐싱되지 않은 값에 접근하면 false를 리턴한다', () => {
    const lru = new LRU(3);
    lru.set(3, 3);
    expect(lru.get(1)).toBe(false);
  });
  test('노드가 하나일 때', () => {
    const lru = new LRU(3);
    const origin = [1];
    const remain = [1];
    for (const num of origin) {
      lru.set(num, num);
    }

    expect(lru.toLinkedListString()).toBe(linkedPrint(remain));
    expect(lru.toMapString()).toBe(mapPrint(remain));
  });

  test('노드수가 최대 캐싱 크기 일때', () => {
    const lru = new LRU(3);
    const origin = [1, 2, 3];
    for (const num of origin) {
      lru.set(num, num);
    }

    lru.get(1);
    expect(lru.toLinkedListString()).toBe(linkedPrint([2, 3, 1]));
    expect(lru.toMapString()).toBe(mapPrint(origin));

    lru.get(1);
    expect(lru.toLinkedListString()).toBe(linkedPrint([2, 3, 1]));
    expect(lru.toMapString()).toBe(mapPrint(origin));

    lru.get(2);
    lru.get(3);
    expect(lru.toLinkedListString()).toBe(linkedPrint([1, 2, 3]));
    expect(lru.toMapString()).toBe(mapPrint(origin));
  });
});
