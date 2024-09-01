# @repodog/eslint-config-playwright

The Repodog Playwright ESLint config module.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config-playwright.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config-playwright)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and dependency

```shell
# terminal
npm install @repodog/eslint-config-playwright eslint --save-dev
```

## Use package

```javascript
// eslint.config.mjs
import config from '@repodog/eslint-config-playwright';

export default [
  ...config.map(entry => ({
    ...entry,
    files: ['**/*.{spec,test}.*'],
  })),
];
```
