# @repodog/jest-config

The Repodog Jest config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fjest-config.svg)](https://badge.fury.io/js/%40repodog%2Fjest-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependencies

```shell
# terminal
npm install @repodog/jest-config @jest/globals jest suppress-experimental-warnings --save-dev
```

## Install optional peer dependencies

```shell
# terminal
npm install babel-jest --save-dev
# or
npm install @swc/jest --save-dev
```

## Use package

### With Babel

```json
// package.json
{
  "scripts": {
    // esm
    "test": "node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js",
    // or cjs
    "test": "MODULE_SYSTEM=cjs node node_modules/jest/bin/jest.js"
  }
}
```

```javascript
// jest.config.cjs
const jestConfig = require('@repodog/jest-config');

module.exports = {
  ...jestConfig(),
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
        // esm
        "NODE_OPTIONS": "--experimental-vm-modules",
        // or cjs
        "MODULE_SYSTEM": "cjs"
      },
      "console": "integratedTerminal"
    }
  ]
}
```

### With SWC

```json
// package.json
{
  "scripts": {
    // esm
    "test": "COMPILER=swc node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js",
    // or cjs
    "test": "COMPILER=swc MODULE_SYSTEM=cjs node node_modules/jest/bin/jest.js"
  }
}
```

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
        "COMPILER": "swc",
        // esm
        "NODE_OPTIONS": "--experimental-vm-modules",
        // or cjs
        "MODULE_SYSTEM": "cjs"
      },
      "console": "integratedTerminal"
    }
  ]
}
```

### Environment variables

#### `COMPILER` = `'babel' || 'swc'`

Uses either Babel or SWC to compile code for Jest. Default `'babel'`.

#### `MODULE_SYSTEM` = `'esm' || 'cjs'`

Sets the module sytem to either ESModules or commonjs. Default `'esm'`.

#### `DEBUG` = `'true' || 'false'`

Changes `testMatch` to cover all test files and disables the Jest timeout. These are useful to set when debugging a file in IDE. Default `'false'`.

#### `JS_ENV` = `'web' || 'node'`

When set to `'web'`, adds regexes to `moduleNameMapper` and `transform` to cater for `.css` and other file extensions Jest cannot resolve. Default `'node'`.
