# @repodog/eslint-config

The Repodog ESlint config.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/eslint-config --save-dev
```

## Install dependencies

```shell
# terminal
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-prettier eslint-plugin-sort-class-members eslint-plugin-sort-destructure-keys eslint-plugin-sort-keys-fix eslint-plugin-typescript-sort-keys eslint-plugin-unicorn --save-dev
```

## Use package

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@repodog/eslint-config'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
};
```
