# @repodog/commitlint-config

The Repodog Commitlint config.

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
npm install @commitlint/cli @commitlint/config-conventional husky --save-dev
```

## Initialize husky

```shell
# terminal
npx husky init
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

## Use package

```javascript
// commitlint.config.cjs
module.exports = {
  extends: ['@repodog/commitlint-config'],
};
```

## Make .husky/ executable

If you get the error `The '.husky/commit-msg' hook was ignored because it's not set as executable.` when trying to create a commit, please run the command `chmod ug+x .husky/*` from your project root and then create the commit again.
