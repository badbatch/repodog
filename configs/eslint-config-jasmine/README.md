# @repodog/eslint-config-jasmine

The Repodog Jasmine ESLint config module.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config-jasmine.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config-jasmine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/eslint-config-jasmine eslint --save-dev
```

## Use package

```javascript
// eslint.config.mjs
import config from '@repodog/eslint-config-jasmine';

export default [
  ...config.map(entry => ({
    ...entry,
    files: ['**/*.{spec,test}.*'],
  })),
];
```
