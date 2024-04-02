import { type Key } from './type';
import { minify } from 'terser';

export * from './LRU';
export * from './DoblyLinkedList';

export async function createKey(code: string, param: Key = '') {
  const compressed = await minify(code);
  return await sha256Hash([compressed.code, param].join(','));
}

async function sha256Hash(input: string) {
  const encodedData = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest('SHA-256', encodedData);
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
