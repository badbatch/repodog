# @repodog/eslint-config

The Repodog ESlint config.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependencies

```shell
# terminal
npm install @repodog/eslint-config eslint prettier typescript --save-dev
```

## Use package

```javascript
// eslint.config.mjs
import config from '@repodog/eslint-config';

// eslint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default [
  ...config,
];
```
