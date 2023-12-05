type Nil = undefined | null;

export const isNil = (type: unknown): type is Nil => {
  if (Object.is(type, null)) return true;
  if (Object.is(type, undefined)) return true;

  return false;
};

export const isDictionary = (obj: unknown) => {
  // TODO 테스트 코드 작성하기
  if (isNil(obj)) return false;
  if (typeof obj !== 'object') return false;
  if (Array.isArray(obj)) return false;
  if (obj instanceof Function) return false;
  return true;
};
