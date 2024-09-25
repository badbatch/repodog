# @repodog/ts-config

The Repodog tsconfig.

[![npm version](https://badge.fury.io/js/%40repodog%2Fts-config.svg)](https://badge.fury.io/js/%40repodog%2Fts-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/ts-config typescript --save-dev
```

## Use package

### Configure

#### Project root

If you are building the project from the root.

```jsonc
// tsconfig.json
{
  "extends": "@repodog/ts-config/index.json",
  "include": [
    "src/**/*"
  ]
}
```

```jsonc
// tsconfig.build.json
{
  "extends": ["./tsconfig.json", "@repodog/ts-config/build.json"],
  "compilerOptions": {
    "outDir": "dist/types",
    "rootDir": "src"
  },
  "exclude": [
    "**/*.test.*"
  ]
}
```

#### Workspace root

If you are building the project from each workspace root.

```jsonc
// tsconfig.json
{
  "extends": "@repodog/ts-config/index.json",
  "include": [
    "packages/**/*"
  ]
}
```

```jsonc
// <workspace>/tsconfig.json
{
  "extends": ["@repodog/ts-config/index.json", "@repodog/ts-config/build.json"],
  "include": [
    "src/**/*"
  ],
  "references": []
}
```

```jsonc
// <workspace>/tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist/types",
    "rootDir": "src"
  },
  "exclude": [
    "**/*.test.*"
  ]
}
```

### Execute

```jsonc
// package.json
{
  "scripts": {
    "compile:types": "tsc --project ./tsconfig.build.json",
    "type-check": "tsc --noEmit"
  }
}
```
