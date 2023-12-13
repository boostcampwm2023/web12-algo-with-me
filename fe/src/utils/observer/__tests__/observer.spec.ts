import { createObserver } from '../index';
import { expect, it, vi } from 'vitest';

it('옵저버는 구독할 수 있으며, 발행시 발행 값을 받아볼 수 있다.', () => {
  const observer = createObserver<number>();
  const fakeFn = vi.fn();
  observer.subscribe(fakeFn);

  observer.notify(1);

  expect(fakeFn).toBeCalledWith(1);
});

it('여러 명의 구독자를 둘 수 있다.', () => {
  const observer = createObserver<number>();
  const fakeFn1 = vi.fn();
  const fakeFn2 = vi.fn();

  observer.subscribe(fakeFn1);
  observer.subscribe(fakeFn2);

  observer.notify(1);

  expect(fakeFn1).toBeCalledWith(1);
  expect(fakeFn2).toBeCalledWith(1);
});

it('구독을 해지할 수 있다.', () => {
  const observer = createObserver<number>();
  const fakeFn1 = vi.fn();
  const fakeFn2 = vi.fn();

  const unsubscriber = observer.subscribe(fakeFn1);
  observer.subscribe(fakeFn2);

  unsubscriber();
  observer.notify(1);

  expect(fakeFn1).not.toBeCalledWith(1);
  expect(fakeFn2).toBeCalledWith(1);
});
