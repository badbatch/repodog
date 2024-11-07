import jasmine from 'eslint-plugin-jasmine';

// eslint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default [
  {
    plugins: {
      jasmine,
    },
    rules: {
      ...jasmine.configs.recommended,
      'jasmine/new-line-before-expect': 0,
      'jasmine/no-spec-dupes': 0,
      'jasmine/no-suite-dupes': 0,
    },
  },
];
