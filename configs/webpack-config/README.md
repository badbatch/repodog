# @repodog/webpack-config

The Repodog webpack config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fwebpack-config.svg)](https://badge.fury.io/js/%40repodog%2Fwebpack-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/webpack-config --save-dev
```

## Install dependencies

```shell
# terminal
npm install source-map-loader webpack webpack-cli --save-dev
```

## Install optional dependencies

```shell
# terminal
npm install babel-loader --save-dev
# or
npm install swc-loader --save-dev
```

## Use package

```json
// package.json
{
  "scripts": {
    "build": "webpack --config ./webpack.config.cjs"
  }
}
```

### With Babel

```javascript
// webpack.config.cjs
const webpackConfig = require('@repodog/webpack-config');

module.exports = {
  ...webpackConfig({ compiler: 'babel-loader' }),
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### With SWC

```javascript
// webpack.config.cjs
const swcConfig = require('@repodog/swc-config');
const webpackConfig = require('@repodog/webpack-config');

module.exports = {
  ...webpackConfig({ compiler: ['swc-loader', swcConfig] }),
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### Bundle tests

```javascript
// webpack.config.cjs
const swcConfig = require('@repodog/swc-config');
const webpackConfig = require('@repodog/webpack-config/test.cjs');

module.exports = {
  ...webpackConfig({ compiler: 'babel-loader' })
  // or
  ...webpackConfig({ compiler: ['swc-loader', swcConfig] }),
};
```

### Environment variables

`NODE_ENV` = `'prod' || 'production' || 'dev' || 'development'`

When set to `'prod'` or `'production'`, source maps are omitted.

**You cam also use the environment variables outlined in [`@repodog/babel-config`](../babel-config/README.md#environment-variables) or [`@repodog/swc-config`](../swc-config/README.md#environment-variables) to control what is output.**
