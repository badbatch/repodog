# @repodog/cli

The RepoDog cli package.

[![npm version](https://badge.fury.io/js/%40repodog%2Fcli.svg)](https://badge.fury.io/js/%40repodog%2Fcli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Summary

* Provides scripts for cutting and publishing releases
* Works with npm, yarn and pnpm.
* Works with standard repo and monorepo structures.
* Cuts major, minor, patch and pre- release types from any branch.
* Generates changelog based on conventional commits since last git tag.
* Updates package version and git tag automatically based on release type.
* Exposes pre- and post-versioning npm script hooks to run custom tasks.
* Commits changelog, version and custom task changes to remote prior to cutting tag.
* Allows force updates of packages to next version regardless of files changed.

## Install package and dependencies

```sh
# terminal
npm install @repodog/cli @babel/runtime core-js --save-dev
```

## Configuration

```json
// package.json
{
  "scripts": {
    "repodog:cut": "repodog cut",
    "repodog:publish": "repodog publish"
  }
}
```

```yaml
# .github/workflows/build-and-publish.yaml
name: Build and publish

on:
  push:
    branches:
      - master
    tags:
      - v**
  pull_request:
    branches:
      - master

jobs:
  build-and-publish:
    uses: badbatch/repodog/.github/workflows/master-build-and-publish.yml
    with:
      node-version: '18.13.0'
      package-manager: 'pnpm'
      package-manager-version: '7.25.1'
    secrets:
      npm_auth_token: ${{ secrets.NPM_AUTH_TOKEN }}
```

## Usage

### cut

```sh
repodog cut <type>

Cut release to current branch

Positionals:
  type  The release type: major | premajor | minor | preminor | patch | prepatch
        | prerelease                                         [string] [required]

Options:
  --version        Show version number                                 [boolean]
  --help           Show help                                           [boolean]
  --tag            The release tag: alpha | beta | unstable             [string]
  --dry-run        The release tag: alpha | beta | unstable            [boolean]
  --force          Increment version regardless of files changed       [boolean]
  --preid          The pre release ID                                   [string]
  --skip-posthook  To skip post version lifecycle hook                 [boolean]
  --skip-prehook   To skip pre version lifecycle hook                  [boolean]
```

#### Script hooks

##### cut:pre-version

Any tasks you want to run prior to package versions getting updated should be run in this script hook.

```json
// package.json
{
  "scripts": {
    "cut:pre-version": "npm run pre-version-tasks"
  }
}
```

##### cut:post-version

Any tasks you want to run after package versions have been updated should be run in this script hook.

```json
// package.json
{
  "scripts": {
    "cut:post-version": "npm run post-version-tasks"
  }
}
```

##### cut:changelog

Any tasks you want to run to generate/update the changelog should be run in this script hook.

```json
// package.json
{
  "scripts": {
    "cut:changelog": "npm run changelog-tasks"
  }
}
```

### publish

```sh
repodog publish

Publish packages to registry

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## Changelog

Check out the [features, fixes and more](CHANGELOG.md) that go into each major, minor and patch version.

## License

@repodog/cli is [MIT Licensed](LICENSE).
