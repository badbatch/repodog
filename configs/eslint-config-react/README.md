# @repodog/eslint-config-react

The Repodog React ESLint config module.

[![npm version](https://badge.fury.io/js/%40repodog%2Feslint-config-react.svg)](https://badge.fury.io/js/%40repodog%2Feslint-config-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/eslint-config-react --save-dev
```

## Install dependencies

```shell
# terminal
npm install eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks --save-dev
```

## Use package

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@repodog/eslint-config', '@repodog/eslint-config-react'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
};
```
