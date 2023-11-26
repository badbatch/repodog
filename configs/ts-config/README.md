# @repodog/ts-config

The RepoDog tsconfig.

[![npm version](https://badge.fury.io/js/%40repodog%2Fts-config.svg)](https://badge.fury.io/js/%40repodog%2Fts-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and dependencies

```shell
# terminal
npm install @repodog/ts-config typescript --save-dev
```

## Use package

### Configure

#### esmodule

```json
// tsconfig.json
{
  "extends": "@repodog/ts-config/index.json",
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
  "extends": "@repodog/ts-config/build.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/types"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "**/*.test.*"
  ]
}
```

#### commonjs

```json
// tsconfig.json
{
  "extends": "@repodog/ts-config/cjs.json",
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
  "extends": "@repodog/ts-config/buildCjs.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/types"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "**/*.test.*"
  ]
}
```

### Execute

```json
// package.json
{
  "scripts": {
    "compile:types": "tsc --project ./tsconfig.build.json",
    "type-check": "tsc --noEmit"
  }
}
```
