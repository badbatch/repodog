# @repodog/eslint-config-jest

The Repodog Jest ESLint config module.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config-jest.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config-jest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/eslint-config-jest eslint --save-dev
```

## Use package

```javascript
// eslint.config.mjs
import config from '@repodog/eslint-config-jest';

export default [
  ...config.map(entry => ({
    ...entry,
    files: ['**/*.{spec,test}.*'],
  })),
];
```
