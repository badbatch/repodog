# @repodog/babel-config

The Repodog Babel config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fbabel-config.svg)](https://badge.fury.io/js/%40repodog%2Fbabel-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependencies

```shell
# terminal
npm install @repodog/babel-config @babel/core @babel/runtime --save-dev
```

## Install optional peer dependencies

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

#### `JS_ENV` = `'web' || 'node'`

Used as cache key when Babel cache is enabled.

#### `NODE_ENV` = `'production' || 'development' || 'test'`

Ignores test files when `NODE_ENV` is not `'test'`.
