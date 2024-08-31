import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

const cwd = process.cwd();

const flatCompat = new FlatCompat({
  baseDirectory: cwd,
});

// eslint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default [
  ...fixupConfigRules(flatCompat.extends('plugin:jasmine/recommended')),
  {
    rules: {
      'jasmine/new-line-before-expect': 0,
      'jasmine/no-spec-dupes': 0,
      'jasmine/no-suite-dupes': 0,
    },
  },
];
