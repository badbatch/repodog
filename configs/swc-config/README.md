# @repodog/swc-config

The Repodog SWC config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fswc-config.svg)](https://badge.fury.io/js/%40repodog%2Fswc-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/swc-config @swc/core -D
```

## Install optional peer dependencies

```shell
# terminal
npm install @rollup/plugin-swc -D
```

If your compiled code requires polyfills, the build config uses `core-js` for those so you may need to include `core-js` as a dependency.

```shell
# terminal
npm install core-js
```

## Use package

This package is designed to be used with `rollup`, `webpack` and `jest` as it allows the config to be a javascript file. The SWC command line library only supports a `.swcrc` json file.

As a javascript file that is passed into rollup, you can override the configuration, and it can be dynamically modified based off environment variables.

Whether the config transforms javascript or typescript is based on whether the config finds a `tsconfig.json` at the root of your project.

### With Rollup

```javascript
// rollup.config.cjs
const rollupConfig = require('@repodog/rollup-config');
const swcConfig = require('@repodog/swc-config');
const swcPlugin = require('@rollup/plugin-swc');

module.exports = {
  ...rollupConfig({ compiler: swcPlugin({ swc: swcConfig.ts }) }),
  // or
  ...rollupConfig({ compiler: swcPlugin({ swc: swcConfig.js }) }),
};
```

### With Webpack

```javascript
// webpack.config.cjs
const webpackConfig = require('@repodog/webpack-config');
const swcConfig = require('@repodog/swc-config');

module.exports = {
  ...webpackConfig({ compiler: ['swc-loader', swcConfig] }),
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### With Jest

```javascript
// jest.config.cjs
const jestConfig = require('@repodog/jest-config');
const swcConfig = require('@repodog/swc-config');

module.exports = {
  ...jestConfig({ compilerOptions: swcConfig }),
};
```

### Environment variables

#### `SWC_MODULE_SYSTEM` = `'esm' || 'cjs'`

Sets `module.type` to `'es6'` or `'commonjs'`. Default `'esm'`.

#### `DEBUG` = `'true' || 'false'`

Changes `targets` to latest version of chrome / current version of nodejs and sets `env.debug` to `true`.

#### `JS_ENV` = `'web' || 'node'`

Changes `targets` to browser based or nodejs based. Default `'node'`.

#### `NODE_ENV` = `'production' || 'development' || 'test'`

Sets `transform.react.development` field. Default `'development'`.
