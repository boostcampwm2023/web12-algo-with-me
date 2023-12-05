type Nil = undefined | null;
type Fn = (...args: unknown[]) => unknown;

export const isNil = (type: unknown): type is Nil => {
  if (Object.is(type, null)) return true;
  if (Object.is(type, undefined)) return true;

  return false;
};

export const isFunction = (type: unknown): type is Fn => {
  if (type instanceof Function) return true;

  return false;
};
