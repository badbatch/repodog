# @repodog/prettier-config

The Repodog Prettier config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fprettier-config.svg)](https://badge.fury.io/js/%40repodog%2Fprettier-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/prettier-config prettier --save-dev
```

## Use package

```javascript
// prettier.config.mjs
import config from '@repodog/prettier-config';

// prettier convention is to export default
// eslint-disable-next-line import/no-default-export
export default {
  ...config,
};
```
