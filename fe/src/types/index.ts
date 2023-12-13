type Dictionary = { [key: string]: unknown };

type JSONType =
  | string
  | number
  | boolean
  | null
  | undefined
  | JSONType[]
  | { [key: string]: JSONType };

export type { Dictionary, JSONType };
