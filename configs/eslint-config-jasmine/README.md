# @repodog/eslint-config-jasmine

The RepoDog Jasmine ESLint config module.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config-jasmine.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config-jasmine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and dependency

```shell
# terminal
npm install @repodog/eslint-config-jasmine eslint-plugin-jasmine --save-dev
```

## Use package

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@repodog/eslint-config'],
  overrides: [
    {
      extends: ['@repodog/eslint-config-jasmine'],
      files: ['**/*.{spec,test}.*'],
    },
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
};
```
