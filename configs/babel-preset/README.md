# @repodog/babel-preset

The Repodog Babel preset.

[![npm version](https://badge.fury.io/js/%40repodog%2Fbabel-preset.svg)](https://badge.fury.io/js/%40repodog%2Fbabel-preset)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependencies

```shell
# terminal
npm install @repodog/babel-preset @babel/core @babel/runtime --save-dev
```

## Use package

```javascript
// babel.config.cjs

module.exports = {
  presets: ['@repodog/babel-preset'],
};
```

### Environment variables

#### `BABEL_MODULE_SYSTEM` = `'esm' || 'cjs'`

When set to `'cjs'`, sets `modules` to `'commonjs'`. Default `'esm'`.

#### `DEBUG` = `'true' || 'false'`

Changes `targets` to latest version of chrome / current version of nodejs. Also sets `@babel/preset-env` debug field. Default `'false'`.

#### `JS_ENV` = `'web' || 'node'`

Changes `targets` to browser based or nodejs based. Default `'node'`.

#### `NODE_ENV` = `'production' || 'development' || 'test'`

Sets `@babel/preset-react` development field. Default `'development'`.
