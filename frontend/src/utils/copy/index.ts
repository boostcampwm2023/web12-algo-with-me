export function deepCopy<T>(value: T): T {
  return structuredClone(value);
}
