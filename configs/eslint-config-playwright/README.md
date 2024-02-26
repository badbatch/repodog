# @repodog/eslint-config-playwright

The Repodog Playwright ESLint config module.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config-playwright.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config-playwright)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and dependency

```shell
# terminal
npm install @repodog/eslint-config-playwright eslint-plugin-playwright --save-dev
```

## Use package

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@repodog/eslint-config'],
  overrides: [
    {
      extends: ['@repodog/eslint-config-playwright'],
      files: ['**/*.{spec,test}.*'],
    },
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
};
```
