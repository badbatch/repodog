# @repodog/eslint-config

The RepoDog ESlint config.

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
npm install @babel/eslint-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-playwright eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-sort-class-members eslint-plugin-sort-destructure-keys eslint-plugin-sort-keys-fix eslint-plugin-typescript-sort-keys eslint-plugin-unicorn --save-dev
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

### With Jest

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@repodog/eslint-config'],
  overrides: [
    {
      extends: ['@repodog/eslint-config/jest.cjs'],
      files: ['**/*.{spec,test}.*'],
    },
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
};
```

### With Playwright

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@repodog/eslint-config'],
  overrides: [
    {
      extends: ['@repodog/eslint-config/playwright.cjs'],
      files: ['**/*.{spec,test}.*'],
    },
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
};
```
