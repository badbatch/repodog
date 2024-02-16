# @repodog/commitlint-config

The RepoDog Commitlint config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fcommitlint-config.svg)](https://badge.fury.io/js/%40repodog%2Fcommitlint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/commitlint-config --save-dev
```

## Install dependencies

```shell
# terminal
npm install husky @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli --save-dev
```

## Initialize husky

```shell
# terminal
npx husky install
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

## Use package

```json
// package.json
{
  "scripts": {
    "commit": "commit"
  }
}
```

```javascript
// commitlint.config.cjs
module.exports = {
  extends: ['@repodog/commitlint-config'],
};
```
