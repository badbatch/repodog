# @repodog/babel-config

The RepoDog Babel config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fbabel-config.svg)](https://badge.fury.io/js/%40repodog%2Fbabel-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/babel-config --save-dev
```

## Install dependencies

```shell
# terminal
npm install @babel/cli @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-export-namespace-from @babel/plugin-syntax-import-assertions @babel/plugin-syntax-dynamic-import @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/runtime babel-plugin-codegen babel-plugin-macros --save-dev
```

## Use package

```javascript
// babel.config.cjs
const repodogConfig = require('@repodog/babel-config');

module.exports = api => ({
  ...repodogConfig(api),
});
```

### Environment variables

`BABEL_DISABLE_CACHE` = `'true' || 'false'`

Disables the Babel cache. Default `'false'`.

`DEBUG` = `'true' || 'false'`

Changes `targets` to latest version of chrome / current version of nodejs. Also sets `@babel/preset-env` debug field. Default `'false'`.

`JS_ENV` = `'web' || 'node'`

Changes `targets` to browser based or nodejs based. Default `'node'`.

`NODE_ENV` = `'prod' || 'production' || 'dev' || 'development'`

Sets `@babel/preset-react` development field. Default `'dev' || 'development'`.

`TEST_ENV` = `'true' || 'false'`

When set to `'false'`, excludes test files. Default `'false'`.
