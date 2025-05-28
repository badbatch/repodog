# @repodog/rollup-config

The Repodog Rollup config.

[![npm version](https://badge.fury.io/js/%40repodog%2Frollup-config.svg)](https://badge.fury.io/js/%40repodog%2Frollup-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/rollup-config rollup  --save-dev
```

**Rollup uses Babel or SWC for code compilation so you will also need to install [`@repodog/babel-config`](../babel-config/README.md) or [`@repodog/swc-config`](../swc-config/README.md) and the relevant peer dependencies.**

## Use package

```jsonc
// package.json
{
  "scripts": {
    "build": "rollup -c ./rollup.config.mjs"
  }
}
```

### With Babel

```javascript
// rollup.config.mjs
import rollupConfig from '@repodog/rollup-config';
import babelConfig from '@repodog/babel-config/rollup';
import { babel as babelPlugin } from '@rollup/plugin-babel';

export default {
  ...rollupConfig({ compiler: babelPlugin(babelConfig) }),
};
```

### With SWC

```javascript
// rollup.config.mjs
import rollupConfig from '@repodog/rollup-config';
import swcConfig from '@repodog/swc-config';
import swcPlugin from '@rollup/plugin-swc';

export default {
  ...rollupConfig({ compiler: swcPlugin({ swc: swcConfig.ts }) }),
  // or
  ...rollupConfig({ compiler: swcPlugin({ swc: swcConfig.js }) }),
};
```

### Environment variables

#### `MODULE_SYSTEM` = `'esm' || 'cjs'`

Sets `output.format`, directory name within `./dist` output, and the extension of the bundled output file. Default `'esm'`.

#### `NODE_ENV` = `'production' || 'development' || 'test'`

When set to `'production'`, terser mangles and compresses, the bundle analyser runs, and source maps are omitted.

**You can also use the environment variables outlined in [`@repodog/babel-config`](../babel-config/README.md#environment-variables) or [`@repodog/swc-config`](../swc-config/README.md#environment-variables) to control what is output.**
