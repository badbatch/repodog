# @repodog/markdownlint-config

The Repodog MarkdownLint config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fmarkdownlint-config.svg)](https://badge.fury.io/js/%40repodog%2Fmarkdownlint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/markdownlint-config markdownlint-cli --save-dev
```

## Install vscode extension

```shell
# terminal
code --install-extension DavidAnson.vscode-markdownlint
```

## Use package

```jsonc
// .markdownlint.json
{
  "extends": "node_modules/@repodog/markdownlint-config/index.json"
}
```

```jsonc
// .vscode/settings.json
{
  "[markdown]": {
    "editor.wordWrapColumn": 120,
    "editor.wordWrap": "wordWrapColumn"
  },
}
```
