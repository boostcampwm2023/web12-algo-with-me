module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    // nestjs 스타일 가이드
    'plugin:nestjs/recommended',
    // google 스타일 가이드
    // 'google',
    // import sort 관련 설정
    'plugin:import/recommended',
    'plugin:import/typescript',
    // prettier
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'nestjs'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // import sort 관련 설정
    'import/order': [
      'error',
      {
        groups: ['external', 'builtin', ['parent', 'sibling'], 'internal'],
        pathGroups: [
          {
            pattern: 'nest',
            group: 'external',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    //
  },
  settings: {
    // import sort 관련 설정
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['src'],
      },
    },
  },
};
