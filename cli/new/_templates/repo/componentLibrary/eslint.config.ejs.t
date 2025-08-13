---
to: eslint.config.mjs
---
import config from '@repodog/eslint-config';
import jestConfig from '@repodog/eslint-config-jest';
import reactConfig from '@repodog/eslint-config-react';

// eslint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default [
  ...config,
  ...reactConfig.map(entry => ({
    ...entry,
    files: ['**/*.{jsx,tsx}'],
  })),
  ...jestConfig.map(entry => ({
    ...entry,
    files: ['**/*.{spec,test}.*'],
  })),
];
