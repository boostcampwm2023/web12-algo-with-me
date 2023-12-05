import { isDictionary } from '../type';

export function save(key: string, origin: unknown) {
  if (isDictionary(origin)) {
    localStorage.setItem(key, JSON.stringify(origin));
  } else {
    localStorage.setItem(key, String(origin));
  }
}
