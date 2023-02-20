# @repodog/jest-config

The RepoDog Jest config.

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
npm install @jest/globals babel-jest identity-obj-proxy jest suppress-experimental-warnings --save-dev
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

```javascript
// jest.config.cjs
const repodogConfig = require('@repodog/jest-config');

module.exports = {
  ...repodogConfig,
};
```

```javascript
// jest.setup.cjs
require('@repodog/jest-config/setup.cjs');
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

`DEBUG` = `'true' || 'false'`

Changes `testMatch` to cover all test files and disables the Jest timeout (if you are requiring the `@repodog/jest-config/setup.cjs` within your setup file). These are useful to set when debugging a file in IDE. Default `'false'`.

`JS_ENV` = `'web' || 'node'`

When set to `'web'`, adds regexes to `moduleNameMapper` and `transform` to cater for `.css` and other file extensions Jest cannot resolve. Defualt `'node'`.
