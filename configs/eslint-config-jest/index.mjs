import jest from 'eslint-plugin-jest';

// eslint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default [
  jest.configs['flat/recommended'],
  jest.configs['flat/style'],
  {
    rules: {
      'jest/consistent-test-it': [
        2,
        {
          fn: 'it',
          withinDescribe: 'it',
        },
      ],
      'jest/max-expects': [
        2,
        {
          max: 1,
        },
      ],
      'jest/max-nested-describe': [
        2,
        {
          max: 5,
        },
      ],
      'jest/no-conditional-in-test': 2,
      'jest/no-duplicate-hooks': 0,
      'jest/no-test-return-statement': 2,
      'jest/prefer-called-with': 2,
      'jest/prefer-comparison-matcher': 2,
      'jest/prefer-each': 2,
      'jest/prefer-equality-matcher': 2,
      'jest/prefer-expect-resolves': 2,
      'jest/prefer-hooks-in-order': 2,
      'jest/prefer-hooks-on-top': 2,
      'jest/prefer-todo': 2,
    },
  },
];
