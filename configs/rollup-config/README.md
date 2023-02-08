# @repodog/rollup-config

The RepoDog Rollup config.

[![npm version](https://badge.fury.io/js/%40repodog%2Frollup-config.svg)](https://badge.fury.io/js/%40repodog%2Frollup-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/rollup-config --save-dev
```

## Use package

```json
// package.json
"scripts": {
  "build": "rollup -c ./rollup.config.cjs"
}
```

```javascript
// rollup.config.cjs
const repodogConfig = require('@repodog/rollup-config');

module.exports = {
  ...repodogConfig,
};
```
