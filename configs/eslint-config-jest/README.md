# @repodog/eslint-config-jest

The RepoDog Jest ESLint config module.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config-jest.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config-jest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and dependency

```shell
# terminal
npm install @repodog/eslint-config-jest eslint-plugin-jest --save-dev
```

## Use package

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@repodog/eslint-config'],
  overrides: [
    {
      extends: ['@repodog/eslint-config-jest'],
      files: ['**/*.{spec,test}.*'],
    },
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
};
```
