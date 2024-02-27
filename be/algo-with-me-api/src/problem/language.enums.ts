export const Language = {
  JavaScript: 'JavaScript',
  Python3: 'Python3',
} as const;

interface ILanguageMetadata {
  oneLineComment: string;
  indent: string;
  endOfSentence: string;
  integerDefaultValue: string;
  stringDefaultValue: string;
  booleanDefaultValue: string;
}
export const LanguagesMetadata: { [key in keyof typeof Language]: ILanguageMetadata } = {
  JavaScript: {
    oneLineComment: '//',
    indent: '  ',
    endOfSentence: ';',
    integerDefaultValue: '0',
    stringDefaultValue: "''",
    booleanDefaultValue: 'true',
  } as ILanguageMetadata,
  Python3: {
    oneLineComment: '//',
    indent: '    ',
    endOfSentence: '',
    integerDefaultValue: '0',
    stringDefaultValue: "''",
    booleanDefaultValue: 'True',
  } as ILanguageMetadata,
} as const;

export type ParameterDataType =
  | 'integer'
  | 'string'
  | 'boolean'
  | 'integer[]'
  | 'string[]'
  | 'boolean[]'
  | 'integer[][]'
  | 'string[][]'
  | 'boolean[][]'
  | string;

export interface IParameter {
  name: string;
  type: ParameterDataType;
}
