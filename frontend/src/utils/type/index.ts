type Nil = undefined | null;

export const isNil = (type: unknown): type is Nil => {
  if (Object.is(type, null)) return true;
  if (Object.is(type, undefined)) return true;

  return false;
};

export const isDictionary = (obj: unknown): obj is Record<string, unknown> => {
  // TODO 테스트 코드 작성하기

  if (obj === null || obj === undefined) return false;
  else if (Array.isArray(obj)) return false;
  else if (obj instanceof Function) return false;
  else if (typeof obj !== 'object') return false;

  return true;
};
