# @repodog/jest-config

The Repodog Jest config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fjest-config.svg)](https://badge.fury.io/js/%40repodog%2Fjest-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/jest-config --save-dev
```

## Install dependencies

```shell
# terminal
npm install @jest/globals identity-obj-proxy jest suppress-experimental-warnings --save-dev
```

## Install optional dependencies

```shell
# terminal
npm install babel-jest --save-dev
# or
npm install @swc/jest --save-dev
```

## Use package

```json
// package.json
{
  "scripts": {
    "test": "node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js"
  }
}
```

### With Babel

```javascript
// jest.config.cjs
const jestConfig = require('@repodog/jest-config');

module.exports = {
  ...jestConfig(),
};
```

### With SWC

```javascript
// jest.config.cjs
const jestConfig = require('@repodog/jest-config');
const swcConfig = require('@repodog/swc-config');

module.exports = {
  ...jestConfig({ compilerOptions: swcConfig }),
};
```

```json
// .vscode/launch.json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest - current file",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      "args": [
        "${relativeFile}"
      ],
      "env": {
        "DEBUG": "true",
        "NODE_OPTIONS": "--experimental-vm-modules"
      },
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Environment variables

`COMPILER` = `'babel' || 'swc'`

Uses either Babel or SWC to compile code for Jest. Default `'babel'`.

`DEBUG` = `'true' || 'false'`

Changes `testMatch` to cover all test files and disables the Jest timeout. These are useful to set when debugging a file in IDE. Default `'false'`.

`JS_ENV` = `'web' || 'node'`

When set to `'web'`, adds regexes to `moduleNameMapper` and `transform` to cater for `.css` and other file extensions Jest cannot resolve. Default `'node'`.
