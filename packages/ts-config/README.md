# @repodog/ts-config

The RepoDog tsconfig.

[![npm version](https://badge.fury.io/js/%40repodog%2Fts-config.svg)](https://badge.fury.io/js/%40repodog%2Fts-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

```shell
npm install @repodog/ts-config --save-dev
```

## Usage

```json
// package.json
{
  "scripts": {
    "compile:types": "tsc --declaration --declarationMap --emitDeclarationOnly --project ./tsconfig.build.json"
  }
}
```

```json
// tsconfig.json
{
  "extends": "./packages/ts-config/index.json",
  "compilerOptions": {
    "rootDir": "src"
  },
  "include": [
    "src/**/*"
  ]
}
```

```json
// tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist/types"
  },
  "exclude": [
    "**/*.test.*"
  ]
}
```
