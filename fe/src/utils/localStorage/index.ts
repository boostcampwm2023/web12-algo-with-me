export function save(key: string, origin: unknown) {
  localStorage.setItem(key, JSON.stringify(origin));
}
