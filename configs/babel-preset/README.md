# @repodog/babel-preset

The Repodog Babel preset.

[![npm version](https://badge.fury.io/js/%40repodog%2Fbabel-preset.svg)](https://badge.fury.io/js/%40repodog%2Fbabel-preset)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependencies

```shell
# terminal
npm install @repodog/babel-preset @babel/core -D
```

## Install optional peer dependency

If your compiled code requires polyfills, the build config uses `core-js` for those so you may need to include `core-js` as a dependency.

```shell
# terminal
npm install core-js
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

Changes `targets` to latest version of chrome / current version of node.js. Also sets `@babel/preset-env` debug field. Default `'false'`.

#### `JS_ENV` = `'web' || 'node'`

Changes `targets` to browser based or node.js based. Default `'node'`.

#### `NODE_ENV` = `'production' || 'development' || 'test'`

Sets `@babel/preset-react` development field. Default `'development'`.
