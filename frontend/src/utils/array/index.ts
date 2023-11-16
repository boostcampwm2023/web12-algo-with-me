export const range = (start: number, end: number, step: number = 1) => {
  const length = Math.floor((end - start) / step);

  return Array.from({ length }, (_, i) => start + step * i);
};
