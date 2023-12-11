const KB_BY_BYTES = 1024;

export function byteToKB(byte: number) {
  return Math.floor(byte / KB_BY_BYTES);
}
