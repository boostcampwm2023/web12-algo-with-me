type Nil = undefined | null;

export const isNil = (type: unknown): type is Nil => {
  if (Object.is(type, null)) return true;
  if (Object.is(type, undefined)) return true;

  return false;
};
