export const LANGUAGES = {
  JavaScript: 'JavaScript',
  Python3: 'Python3',
} as const;

const LANGUAGE_IDS = {
  JavaScript: 1,
  Python: 2,
} as const;

export function getLanguageIdByName(languageName: keyof typeof LANGUAGES) {
  if (!(languageName in LANGUAGE_IDS)) {
    throw new Error(
      `${languageName} 언어는 지원하지 않는 언어입니다. 지원하는 언어: ${Object.keys(
        LANGUAGE_IDS,
      ).join(', ')}`,
    );
  }
  return LANGUAGE_IDS[languageName];
}

interface ILanguageMetadata {
  oneLineComment: string;
  indent: string;
  endOfSentence: string;
  integerDefaultValue: string;
  stringDefaultValue: string;
  booleanDefaultValue: string;
}
export const LanguagesMetadata: { [key in keyof typeof LANGUAGES]: ILanguageMetadata } = {
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
