# @repodog/markdownlint-config

The Repodog MarkdownLint config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fmarkdownlint-config.svg)](https://badge.fury.io/js/%40repodog%2Fmarkdownlint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
pnpm add --save-dev @repodog/markdownlint-config markdownlint-cli2
```

## Install vscode extension

```shell
# terminal
code --install-extension DavidAnson.vscode-markdownlint
```

## Use package

Create one `.markdownlint-cli2.jsonc` file in the repository root. Put Markdown rules inside `config` and file exclusions in the top-level `ignores` array:

```jsonc
// .markdownlint-cli2.jsonc
{
  "config": {
    "extends": "@repodog/markdownlint-config",
  },
  "ignores": [
    "node_modules/**",
    ".next/**",
    "coverage/**",
    "dist/**",
    "playwright-report/**",
    "storybook-static/**",
    "test-results/**",
  ],
}
```

Keep only the generated directories that apply to your repository. Add generated files such as Next.js's `AGENTS.md` when appropriate; authored Markdown should remain linted.

Add a script to `package.json`:

```json
{
  "scripts": {
    "lint:docs": "markdownlint-cli2 \"**/*.md\""
  }
}
```

Run `pnpm lint:docs`. The CLI automatically discovers `.markdownlint-cli2.jsonc`, so no `--config` argument is needed. When migrating from `.markdownlint.json`, move its rule settings into `config`, remove the old file, and remove any `--config ".markdownlint.json"` argument from your scripts. `ignores` is a CLI option, rather than a Markdown rule.

To override a shared rule, add it alongside `extends` inside `config`:

```jsonc
{
  "config": {
    "extends": "@repodog/markdownlint-config",
    "MD041": false,
  },
}
```

## VS Code settings

```jsonc
// .vscode/settings.json
{
  "[markdown]": {
    "editor.wordWrapColumn": 120,
    "editor.wordWrap": "wordWrapColumn",
  },
}
```
