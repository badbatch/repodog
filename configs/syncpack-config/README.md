# @repodog/syncpack-config

The Repodog Syncpack config module.

[![npm version](https://badge.fury.io/js/%40repodog%2Fsyncpack-config.svg)](https://badge.fury.io/js/%40repodog%2Fsyncpack-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/syncpack-config syncpack --save-dev
```

## Use package

```javascript
// .syncpackrc.cjs
const repodogConfig = require('@repodog/syncpack-config');

module.exports = {
  ...repodogConfig,
};
```
