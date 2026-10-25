# @repodog/stylelint-config

The Repodog stylelint config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fwebpack-config.svg)](https://badge.fury.io/js/%40repodog%2Fwebpack-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/stylelint-config stylelint --save-dev
```

## Use package

```jsonc
// package.json
{
  "scripts": {
    "lint:css": "stylelint '**/*.css'"
  },
}
```

```javascript
// stylelint.config.mjs

// stylelint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default {
    extends: ['@repodog/stylelint-config'],
};
```
