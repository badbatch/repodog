# @repodog/jest-config

The RepoDog Jest config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fjest-config.svg)](https://badge.fury.io/js/%40repodog%2Fjest-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

```shell
npm install @repodog/jest-config --save-dev
```

## Usage

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
```
