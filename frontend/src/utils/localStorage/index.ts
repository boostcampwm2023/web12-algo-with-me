import { isDictionary } from '../type';

type Dictionary = { [key: string]: unknown };

type JSONType =
  | string
  | number
  | boolean
  | null
  | undefined
  | JSONType[]
  | { [key: string]: JSONType };

export function save(key: string, origin: unknown) {
  if (isDictionary(origin)) {
    localStorage.setItem(key, JSON.stringify(origin));
  } else {
    localStorage.setItem(key, String(origin));
  }
}

export function getTarget(keys: string[]): JSONType {
  let savedInfo = getOrigin(keys[0]);

  if (keys.length === 1 || !savedInfo) return savedInfo;

  for (let i = 1; i < keys.length; i++) {
    if (!isDictionary(savedInfo)) return null;
    savedInfo = savedInfo[keys[i]] as Dictionary;
  }
  return savedInfo;
}

export function getOrigin(key: string) {
  return JSON.parse(String(localStorage.getItem(key)));
}
