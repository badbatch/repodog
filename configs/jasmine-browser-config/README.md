# @repodog/jasmine-browser-config

The Repodog jasmine-browser config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fjasmine-browser-config.svg)](https://badge.fury.io/js/%40repodog%2Fjasmine-browser-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependencies

```shell
# terminal
npm install @repodog/jasmine-browser-config @repodog/webpack-config @types/jasmine jasmine-browser-runner jasmine-core jasmine-expect --save-dev
```

## Use package

```jsonc
// package.json
{
  "scripts": {
    "test:browser": "pnpm run test:browser:remove && pnpm run test:browser:build && pnpm run test:browser:run",
    "test:browser:build": "webpack --config ./webpack.config.cjs",
    "test:browser:debug": "jasmine-browser-runner serve --config=jasmineBrowser.config.mjs --browser chrome",
    "test:browser:remove": "del-cli ./tests/browser/dist",
    "test:browser:run": "jasmine-browser-runner runSpecs --config=jasmineBrowser.config.mjs",
  }
}
```

```javascript
// jasmineBrowser.config.mjs
import repodogConfig from '@repodog/jasmine-browser-config';

export default {
  ...repodogConfig,
};
```

```javascript
// webpack.config.cjs
const swcConfig = require('@repodog/swc-config');
const webpackConfig = require('@repodog/webpack-config/test.cjs');

module.exports = {
  ...webpackConfig({ compiler: 'babel-loader' }),
  // or
  ...webpackConfig({ compiler: ['swc-loader', swcConfig] }),
};
```
