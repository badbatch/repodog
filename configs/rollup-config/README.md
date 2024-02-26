# @repodog/rollup-config

The Repodog Rollup config.

[![npm version](https://badge.fury.io/js/%40repodog%2Frollup-config.svg)](https://badge.fury.io/js/%40repodog%2Frollup-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/rollup-config --save-dev
```

## Install dependencies

```shell
# terminal
npm install @rollup/plugin-image @rollup/plugin-json @rollup/plugin-node-resolve @rollup/plugin-terser rollup rollup-plugin-analyzer rollup-plugin-copy rollup-plugin-sourcemaps --save-dev
```

**Rollup uses Babel or SWC for code compilation so you will also need to install [`@repodog/babel-config`](../babel-config/README.md) or [`@repodog/swc-config`](../swc-config/README.md) and the relevant dependencies.**

## Use package

```json
// package.json
{
  "scripts": {
    "build": "rollup -c ./rollup.config.cjs"
  }
}
```

### With Babel

```javascript
// rollup.config.cjs
const rollupConfig = require('@repodog/rollup-config');
const babelConfig = require('@repodog/babel-config/rollup');
const { babel: babelPlugin } = require('@rollup/plugin-babel');

module.exports = {
  ...rollupConfig({ compiler: babelPlugin(babelConfig) }),
};
```

### With SWC

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

### Environment variables

`MODULE_SYSTEM` = `'esm' || 'cjs'`

Sets `output.format`, directory name within `./dist` output, and the extension of the bundled output file. Default `'esm'`.

`NODE_ENV` = `'prod' || 'production' || 'dev' || 'development'`

When set to `'prod'` or `'production'`, terser mangles and compresses, the bundle analyser runs, and source maps are omitted.

**You cam also use the environment variables outlined in [`@repodog/babel-config`](../babel-config/README.md#environment-variables) or [`@repodog/swc-config`](../swc-config/README.md#environment-variables) to control what is output.**
