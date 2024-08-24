# @repodog/babel-config

The Repodog Babel config.

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
npm install @babel/cli @babel/core @babel/plugin-proposal-decorators @babel/plugin-syntax-import-attributes @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/runtime babel-plugin-codegen babel-plugin-macros --save-dev
```

## Install optional dependencies

```shell
# terminal
npm install @rollup/plugin-babel --save-dev
```

## Use package

```javascript
// babel.config.cjs
const repodogConfig = require('@repodog/babel-config');

module.exports = api => ({
  ...repodogConfig(api),
});
```

### Usage with rollup

```javascript
const rollupConfig = require('@repodog/rollup-config');
const babelConfig = require('@repodog/babel-config/rollup');
const { babel: babelPlugin } = require('@rollup/plugin-babel');

module.exports = {
  ...rollupConfig({ compiler: babelPlugin(babelConfig) }),
};
```

### Environment variables

#### `BABEL_DISABLE_CACHE` = `'true' || 'false'`

Disables the Babel cache. Default `'false'`.

#### `BABEL_MODULE_SYSTEM` = `'esm' || 'cjs'`

When set to `'cjs'`, sets `modules` to `'commonjs'`. Default `'esm'`.

#### `DEBUG` = `'true' || 'false'`

Changes `targets` to latest version of chrome / current version of nodejs. Also sets `@babel/preset-env` debug field. Default `'false'`.

#### `JS_ENV` = `'web' || 'node'`

Changes `targets` to browser based or nodejs based. Default `'node'`.

#### `NODE_ENV` = `'production' || 'development' || 'test'`

Sets `@babel/preset-react` development field. Default `'development'`.
