# @repodog/eslint-config

The Repodog ESlint config.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/eslint-config --save-dev
```

## Install peer dependencies

```shell
# terminal
npm install eslint typescript --save-dev
```

## Use package

```javascript
// eslint.config.mjs
import config from '@repodog/eslint-config';

// eslint convention is to export default
// eslint-disable-next-line import/no-default-export
export default [
  ...config,
];
```
