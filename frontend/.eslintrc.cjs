module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'google',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'object-curly-spacing': 'off',
    'require-jsdoc': 'off',
    'max-len': 'off',
    'operator-linebreak': 'off',
    indent: 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^.+\\.s?css$'], ['^react'], ['^@(/.*|$)']],
      },
    ],
  },
};
