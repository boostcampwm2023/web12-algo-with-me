export type Listener<T> = (result: T) => void;

export function createObserver<T>(listeners: Listener<T>[] = []) {
  function notify(data: T) {
    listeners.forEach((l) => l(data));
  }
  function subscribe(listener: Listener<T>) {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  return {
    subscribe,
    notify,
  };
}
