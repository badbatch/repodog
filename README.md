# RepoDog

An opinionated command line utility for managing repositories.

[![build-and-deploy](https://github.com/badbatch/repodog/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/badbatch/repodog/actions/workflows/build-and-deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Summary

* Extensible configurations for Typescript, popular linters, and build tools.
* CLI command for creating a single package repository.
* CLI commands for creating a monorepo and individual packages within it.
* Set of scripts for common repository management tasks.

## Installation

RepoDog is structured as a [monorepo](https://github.com/lerna/lerna), so each package is published to npm under the
`@repodog` scope and can be installed in a project in the same way as any other npm package.

```shell
yarn add @repodog/<package>
```

## Packages

* [@repodog/babel-config](packages/babel-config)
* [@repodog/build-references](packages/build-references)
* [@repodog/commitlint-config](packages/commitlint-config)
* [@repodog/config-helpers](packages/config-helpers)
* [@repodog/constants](packages/constants)
* [@repodog/eslint-config](packages/eslint-config)
* [@repodog/helpers](packages/helpers)
* [@repodog/jest-config](packages/jest-config)
* [@repodog/lerna-config](packages/lerna-config)
* [@repodog/markdownlint-config](packages/markdownlint-config)
* [@repodog/new-monorepo](packages/new-monorepo)
* [@repodog/new-package](packages/new-package)
* [@repodog/new-repo](packages/new-repo)
* [@repodog/prettier-config](packages/prettier-config)
* [@repodog/rollup-config](packages/rollup-config)
* [@repodog/stylelint-config](packages/stylelint-config)
* [@repodog/ts-config](packages/ts-config)
* [@repodog/tslint-config](packages/tslint-config)
* [@repodog/typedoc-config](packages/typedoc-config)
* [@repodog/types](packages/types)

## Usage

For usage instructions, see the individual package README files.

## Changelog

Check out the [features, fixes and more](CHANGELOG.md) that go into each major, minor and patch version.

## License

RepoDog is [MIT Licensed](LICENSE).
