# @repodog/cli

The Repodog cli package.

[![npm version](https://badge.fury.io/js/%40repodog%2Fcli.svg)](https://badge.fury.io/js/%40repodog%2Fcli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Summary

- Scripts for cutting and publishing releases
- Scripts for scaffolding new folder structures
- Scripts for writing files with ChatGPT
- Works with npm, yarn and pnpm
- Works with standard repo and monorepo structures

## Install package

```sh
# terminal
npm install @repodog/cli --save-dev
```

## Configuration

```jsonc
// package.json
{
  "scripts": {
    "repodog": "repodog",
  }
}
```

### With Github Actions

```yml
# .github/workflows/build-and-publish.yml
name: Build and publish

on:
  push:
    branches:
      - main
    tags:
      - v**
  pull_request:
    branches:
      - main

jobs:
  build-and-publish:
    uses: badbatch/repodog/.github/workflows/master-build-and-publish.yml@main
    secrets:
      npm_auth_token: ${{ secrets.NPM_AUTH_TOKEN }}
```

### With Azure Devops

```yml
# pipelines/azure-pipeline.yml
trigger:
  branches:
    include:
      - main
  tags:
    include:
      - v**

pr:
  - main

resources:
  repositories:
    - repository: repodog
      type: github
      name: badbatch/repodog
      ref: main

jobs:
  - template: pipelines/azure-pipeline-template.yml@repodog
```

## Usage

### cut

```sh
repodog cut <type>

Cut release to current branch

Positionals:
  type  The release type: major | premajor | minor | preminor | patch | prepatch
         | prerelease | dry-run                              [string] [required]

Options:
  --version                  Show version number                       [boolean]
  --help                     Show help                                 [boolean]
  --tag                      The release tag: alpha | beta | pr | unstable
                                                                        [string]
  --preid                    A unique identifier for the pre-release    [string]
  --dry-run                  Stop job before versioning changes are committed
                                                                       [boolean]
  --filter                   A glob for filtering the packages the command is ru
                             n against                                  [string]
  --force                    Increment version regardless of files changed
                                                                       [boolean]
  --skip-posthook            To skip post version lifecycle hook       [boolean]
  --skip-prehook             To skip pre version lifecycle hook        [boolean]
  --skip-node-version-check  To skip the node version check            [boolean]
  --verbose                  Whether to output verbose logs            [boolean]
```

> If you run `repodog cut` with the `--dry-run` flag, you can subsequently cut the dry-run release by re-running `repodog cut` with `dry-run` as the release type.

#### Script hooks

##### cut:pre-version

Any tasks you want to run prior to package versions getting updated should be run in this script hook.

```jsonc
// package.json
{
  "scripts": {
    "cut:pre-version": "npm run pre-version-tasks",
  }
}
```

##### cut:post-version

Any tasks you want to run after package versions have been updated should be run in this script hook.

```jsonc
// package.json
{
  "scripts": {
    "cut:post-version": "npm run post-version-tasks",
  }
}
```

##### cut:changelog

Any tasks you want to run to generate/update the changelog should be run in this script hook.

```jsonc
// package.json
{
  "scripts": {
    "cut:changelog": "npm run changelog-tasks",
  }
}
```

---

### new

```sh
repodog new <type> [subtype]

Scaffold new folder structure

Positionals:
  type              The type of folder to scaffold: app | repo | pkg
                                                             [string] [required]
  subtype           The subtype of folder to scaffold; repo: componentLibrary |
                    library | monorepo; pkg: component | config | library
                                                             [string] [required]
  custom-type-path  The additional types to apply to the scaffold. Multiple
                    types should be separated by a "." character. These types
                    are applied after the subtype                       [string]

Options:
  --version                    Show version number                     [boolean]
  --help                       Show help                               [boolean]
  --exclude-builtin-templates  To skip the node version check          [boolean]
  --skip-node-version-check    To skip the node version check          [boolean]
  --verbose                    Whether to output verbose logs          [boolean]
```

#### Application bootstraps

```sh
repodog new app nextjs
repodog new app dotnet
```

Application scaffolding downloads the corresponding GitHub kickstarter, asks for its name, description, GitHub owner and optional counterpart repository, and applies the starter's `.repodog-bootstrap.json` manifest. The two application commands create separate folders. Supplying a counterpart wires the Next.js/.NET pair together; leaving it blank keeps validation independent and omits cross-repository E2E workflows and paired Docker tooling. The Next.js app still expects a backend implementing its endpoint contract; that backend need not be .NET. Paired generation is not included yet.

The default sources are `badbatch/repodog-nextjs-kickstarter` and `badbatch/repodog-dotnet-kickstarter`, both at `main`. Git must be installed; private sources use the credentials already configured for Git. No GitHub token is stored in Repodog configuration.

Override sources in a project or global `.repodogrc` to choose a branch, release tag or commit:

```json
{
  "appBootstraps": {
    "nextjs": {
      "repository": "your-owner/repodog-nextjs-kickstarter",
      "ref": "v1.0.0"
    },
    "dotnet": {
      "repository": "your-owner/repodog-dotnet-kickstarter",
      "ref": "v1.0.0"
    }
  }
}
```

Existing `questionOverrides` and `templateVariables` conventions apply under `new.app.nextjs` and `new.app.dotnet`. An optional custom type path selects more specific configuration defaults; application generation does not apply Hygen overlays or `additionalTemplatesPath`. `--exclude-builtin-templates` is rejected for applications.

The answers provide `name`, `description`, `owner` and `counterpartRepository`. The generator also supplies `repository`, `counterpartPath`, `namespace` and `configPrefix`. Namespace defaults to the PascalCase application name; the configuration prefix defaults to its uppercase name, with hyphens replaced by underscores and a trailing underscore. Override these through template variables or added questions.

Each starter owns a versioned manifest. Its `files` array lists UTF-8 files to customize; `replacements` apply literal substitutions within those files, and ordered `renamePaths` rules rename projects and directories. `exclude` lists files or directories to omit. Paths must stay inside the application, symbolic links are rejected, and the manifest never executes commands.

```json
{
  "version": 1,
  "files": ["package.json"],
  "replacements": [
    { "from": "starter-name", "to": "{{name}}" },
    { "from": "\"starter description\"", "to": "{{description|json}}" }
  ],
  "renamePaths": [],
  "exclude": []
}
```

Use `{{variable}}` for literal values and `{{variable|json}}` when replacing an entire JSON string value. Missing variables fail generation. Files not listed for replacement, including binary assets, are copied unchanged. List child-file renames before their parent-directory renames.

Generation prepares a temporary copy before creating the destination, refuses existing folders, and records the repository, requested ref and resolved commit in `.repodog-origin.json`. Source Git history and the bootstrap manifest are omitted. No dependency installation, lifecycle scripts, Git initialization, commits, pushes or GitHub repository creation run automatically. The command prints the next setup steps; a .NET application does not require JavaScript package-manager configuration.

`whenMissing` optionally maps a variable name to `exclude` paths and `fileReplacements` (`file`, `from`, `to`). These apply before normal substitutions when that variable is missing or blank. The supplied starters use it to remove counterpart-dependent tooling and update workflows and documentation for standalone generation.

When generating a paired setup, after publishing the repositories, configure `CROSS_REPO_READ_TOKEN` and reusable-workflow access for their cross-repository E2E jobs.

#### `new` config

Below are the config properties used in the `repodog new` script. The `.repodogrc` config file must be located at the
root of your project or globally. If you want the config to be global, use the [setup command](#setup) to create/update a global config.

##### `additionalTemplatesPath`

Include additional templates as part of the set of templates used to generate a folder structure. You can use the `type`, `subtype` and `custom-type-path` options to target specific template sets based on the folder structure within your additional templates path.

The additional templates path is relative to the current working directory if declared in a project config or absolute if declared in a global config.

The templating functionality is powered by [`hygen`](https://www.hygen.io/) so all templates must to adhere to its
rules.

The example below uses the additional `command.ejs.t` template file when `repodog new` is called with `pkg library cli`.

```txt
// filesystem
_templates/
- new/
  - pkg/
    - library/
      - cli/
        - command.ejs.t
```

```jsonc
// <projectRoot>/.repodogrc
{
  "additionalTemplatesPath": "./_templates",
}
```

##### `questionOverrides`

Add, remove, and/or replace the [base set of questions](../new/src/questions) for a given `type` and `subtype`. You can use the `type`, `subtype` and `custom-type-path` options to target the overrides to create bespoke question sets.

`questionOverrides` can only be declared in a project config. To set `questionOverrides` globally, see the [`questionOverridesPath` property](#questionoverridespath).

The example below adds two questions, removes one, and updates one when `repodog new` is called with `pkg library cli`.

```jsonc
// .repodogrc
{
  "questionOverrides": {
    "new": {
      "pkg": {
        "library": {
          "cli": {
            "add": [
              {
                "message": "What is the cli command?",
                "name": "cliCommand",
                "required": true,
                "type": "input",
              },
              {
                "message": "What is the cli description?",
                "name": "cliDescription",
                "required": true,
                "type": "input",
              },
            ],
            "remove": ["mainFilename"],
            "replace": [
              {
                "message": "What is the homepage for the package's repository?",
                "name": "homepage",
                "required": true,
                "type": "input",
              },
            ],
          },
        },
      },
    },
  },
}
```

##### `questionOverridesPath`

Path to the JSON file containing your question overrides. The file adheres to the same structure as in the example above, except the content is not nested within a `questionOverrides` property.

The path is relative to the current working directory if declared in a project config or absolute if declared in a global config.

##### `templateVariables`

Values to populate your templates with. You can use the `type`, `subtype` and `custom-type-path` options to target the variables to specific template sets. The config allows for variables to be applied to all templates or a branch of templates through the `*` character.

Template variables are flattened and merged and the output is passed into the templates. If any of the keys match the name a question, then the key's value is used as the question's initial answer.

`templateVariables` can only be declared in a project config. To set `templateVariables` globally, see the [`templateVariablesPath` property](#templatevariablespath).

```jsonc
// .repodogrc
{
  "templateVariables": {
    "*": {
      "author": "miami-man",
      "homepage": "https://github.com/badbatch/repodog",
      "org": "repodog",
    },
    "new": {
      "pkg": {
        "library": {
          "cli": {
            "mainFilename": "handler",
          },
        },
      },
    },
  },
}
```

##### `templateVariablesPath`

Path to the JSON file containing your template variable overrides. The file adheres to the same structure as in the example above, except the content is not nested within a `templateVariables` property.

The path is relative to the current working directory if declared in a project config or absolute if declared in a global config.

---

### publish

```sh
repodog publish

Publish packages to registry

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --verbose  Whether to output verbose logs                            [boolean]
```

---

### setup

```sh
repodog setup

Set up global config

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --verbose  Whether to output verbose logs                            [boolean]
```

---

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
  --verbose     Whether to output verbose logs                         [boolean]
```

#### Environment variables

`OPENAI_API_KEY` = `*****`

Required in order to communicate with the ChatGPT API. To get an OpenAI API key, [sign up on their website](https://openai.com/).

#### `write` config

Below are the config properties used in the `repodog write` script. The `.repodogrc` config file must be located at the
root of your project, regardless of whether the repo has a standard or monorepo structure.

##### `language`

The programming language, either `'javascript'` or `'typescript'`. The default is `'javascript'`. This can be set at either a project or global level.

##### `environmentVariablesPath`

The path to the file where your environment variables are stored. The path is relative to the current working directory. The default is `'.env'`. This can be set at either a project or global level.

The path is relative to the current working directory if declared in a project config or absolute if declared in a global config.

---

## Changelog

Check out the [features, fixes and more](../../CHANGELOG.md) that go into each major, minor and patch version.

## License

@repodog/cli is [MIT Licensed](LICENSE).
