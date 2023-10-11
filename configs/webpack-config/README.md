# @repodog/webpack-config

The RepoDog webpack config.

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
npm install babel-loader source-map-loader webpack webpack-cli --save-dev
```

## Use package

```javascript
// webpack.config.cjs
const repodogConfig = require('@repodog/webpack-config');

module.exports = {
  ...repodogConfig,
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
const repodogConfig = require('@repodog/webpack-config/test.cjs');

module.exports = {
  ...repodogConfig()
};
```

### Environment variables

`NODE_ENV` = `'prod' || 'production' || 'dev' || 'development'`

When set to `'prod'` or `'production'`, source maps are omitted.

**You cam also use the environment variables outlined in [`@repodog/babel-config`](../babel-config/README.md#environment-variables) to control what is output.**
