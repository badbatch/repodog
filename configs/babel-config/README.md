# @repodog/babel-config

The Repodog Babel config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fbabel-config.svg)](https://badge.fury.io/js/%40repodog%2Fbabel-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependencies

```shell
# terminal
npm install @repodog/babel-config @babel/core @babel/runtime --save-dev
```

## Install optional peer dependency

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
// rollup.config.mjs
import rollupConfig from '@repodog/rollup-config';
import babelConfig from '@repodog/babel-config/rollup';
import { babel as babelPlugin } from '@rollup/plugin-babel';

export default {
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

**You can also use the environment variables outlined in [`@repodog/babel-preset`](../babel-preset/README.md#environment-variables) to control what is output.**
