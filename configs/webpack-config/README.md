# @repodog/webpack-config

The Repodog webpack config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fwebpack-config.svg)](https://badge.fury.io/js/%40repodog%2Fwebpack-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/webpack-config webpack --save-dev
```

## Install optional dependencies

```shell
# terminal
npm install babel-loader webpack-cli --save-dev
# or
npm install swc-loader webpack-cli --save-dev
```

## Use package

```jsonc
// package.json
{
  "scripts": {
    "build": "webpack --config ./webpack.config.mjs",
  },
}
```

### With Babel

```javascript
// webpack.config.mjs
import webpackConfig from '@repodog/webpack-config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  ...webpackConfig({ compiler: 'babel-loader' }),
  entry: './src/index.ts',
  // or
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### With SWC

```javascript
// webpack.config.mjs
import swcConfig from '@repodog/swc-config';
import webpackConfig from '@repodog/webpack-config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  ...webpackConfig({ compiler: ['swc-loader', swcConfig.ts] }),
  entry: './src/index.ts',
  // or
  ...webpackConfig({ compiler: ['swc-loader', swcConfig.js] }),
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### Bundle tests

```javascript
// webpack.config.mjs
import swcConfig from '@repodog/swc-config';
import webpackConfig from '@repodog/webpack-config/test.mjs';

module.exports = {
  ...webpackConfig({ compiler: 'babel-loader' }),
  // or
  ...webpackConfig({ compiler: ['swc-loader', swcConfig.ts] }),
  // or
  ...webpackConfig({ compiler: ['swc-loader', swcConfig.js] }),
};
```

### Environment variables

#### `DEBUG` = `'true' || 'false'`

Sets `source-map-loader` and `SourceMapDevToolPlugin`.

#### `NODE_ENV` = `'production' || 'development' || 'test'`

When set to `'prod'` or `'production'`, source maps are omitted.

**You can also use the environment variables outlined in [`@repodog/babel-config`](../babel-config/README.md#environment-variables) or [`@repodog/swc-config`](../swc-config/README.md#environment-variables) to control what is output.**
