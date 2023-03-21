# @repodog/cli

The RepoDog cli package.

[![npm version](https://badge.fury.io/js/%40repodog%2Fcli.svg)](https://badge.fury.io/js/%40repodog%2Fcli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Summary

* Scripts for cutting and publishing releases
* Scripts for scaffolding new folder structures
* Scripts for writing files with ChatGPT
* Works with npm, yarn and pnpm
* Works with standard repo and monorepo structures

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
    "repodog:new": "repodog new",
    "repodog:publish": "repodog publish",
    "repodog:write": "repodog write"
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
        | prerelease | dry-run                               [string] [required]

Options:
  --version        Show version number                                 [boolean]
  --help           Show help                                           [boolean]
  --tag            The release tag: alpha | beta | unstable             [string]
  --dry-run        The release tag: alpha | beta | unstable            [boolean]
  --force          Increment version regardless of files changed       [boolean]
  --preid          The pre release ID                                   [string]
  --skip-posthook  To skip post version lifecycle hook                 [boolean]
  --skip-prehook   To skip pre version lifecycle hook                  [boolean]
  --verbose        Whether to output verbose logs.                     [boolean]
```

> If you run `repodog cut` with the `--dry-run` flag, you can subsequently cut the dry-run release by re-running `repodog cut` with `dry-run` as the release type.

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

### new

```sh
repodog new <type>

Scaffold new folder structure

Positionals:
  type  The type of folder to scaffold: repo | pkg           [string] [required]

Options:
  --version   Show version number                                      [boolean]
  --help      Show help                                                [boolean]
  --subtypes  The sub types to apply to the scaffold. Multiple types should be
              separated by a "." character                              [string]
  --verbose   Whether to output verbose logs.                          [boolean]
```

#### `new` config

Below are the config properties used in the `repodog new` script. The `.repodogrc` config file must be located at the
root of your project, regardless of whether the repo has a standard or monorepo structure.

##### `additionalTemplatesPath`

Include additional templates as part of the set of templates used to generate a folder structure. You can use the `type` and `subtypes` options to target specific template sets based on the folder structure within your additional templates path. The additional templates path is relative to the current working directory.

The templating functionality is powered by [`hygen`](https://www.hygen.io/) so all templates must to adhere to its
rules.

The example below uses the additional `command.ejs.t` template file when `repodog new` is called with `pkg --subtypes cli`.

```txt
// filesystem
_templates/
- new/
  - pkg/
    - cli/
      - command.ejs.t
```

```json
// .repodogrc
{
  "additionalTemplatesPath": "./_templates"
}
```

##### `questionOverrides`

Add, remove, and/or replace the [base set of questions](../new/src/questions) for a given `type`. You can use the `type` and `subtypes` options to target the overrides to create bespoke question sets.

The example below adds two questions, removes one, and updates one when `repodog new` is called with `pkg --subtypes cli`.

```json
// .repodogrc
{
  "questionOverrides": {
    "new": {
      "pkg": {
        "cli": {
          "add": [
            {
              "message": "What is the cli command?",
              "name": "cliCommand",
              "required": true,
              "type": "input"
            },
            {
              "message": "What is the cli description?",
              "name": "cliDescription",
              "required": true,
              "type": "input"
            }
          ],
          "remove": ["mainFilename"],
          "replace": [
            {
              "message": "What is the homepage for the package's repository?",
              "name": "homepage",
              "required": true,
              "type": "input"
            }
          ]
        }
      }
    }
  }
}
```

##### `templateVariables`

Values to populate your templates with. You can use the `type` and `subtypes` options to target the variables to specific template sets. The config allows for variables to be applied to all templates or a branch of templates through the `*` character.

Template variables are flattened and merged and the output is passed into the templates. If any of the keys match the name a question, then the key's value is used as the question's initial answer.

```json
// .repodogrc
{
  "templateVariables": {
    "*": {
      "author": "Dylan Aubrey",
      "homepage": "https://github.com/badbatch/repodog",
      "org": "repodog"
    },
    "new": {
      "pkg": {
        "cli": {
          "mainFilename": "handler"
        }
      }
    }
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
  --verbose  Whether to output verbose logs.                           [boolean]
```

### write

```sh
repodog write <type> <file-path>

Write the content of a new file

Positionals:
  type      The write type: test                             [string] [required]
  file-path  Path to file to execute write type against. Relative to cwd
                                                             [string] [required]

Options:
  --version     Show version number                                    [boolean]
  --help        Show help                                              [boolean]
  --skip-format  Whether to skip formatting of the content of the new file
                                                                       [boolean]
  --verbose     Whether to output verbose logs.                        [boolean]
```

#### Environment variables

`OPENAI_API_KEY` = `*****`

Required in order to communicate with the ChatGPT API. To get an OpenAI API key, [sign up on their website](https://openai.com/).

#### `write` config

Below are the config properties used in the `repodog write` script. The `.repodogrc` config file must be located at the
root of your project, regardless of whether the repo has a standard or monorepo structure.

##### `language`

The programming language, either `'javascript'` or `'typescript'`. The default is `'javascript'`.

##### `environmentVariablesPath`

The path to the file where your environment variables are stored. The path is relative to the current working directory. The default is `'.env'`.

## Changelog

Check out the [features, fixes and more](CHANGELOG.md) that go into each major, minor and patch version.

## License

@repodog/cli is [MIT Licensed](LICENSE).
