# @repodog/cli

Repodog scaffolds applications, repositories and packages, and automates versioning and publishing for JavaScript projects. It supports npm, pnpm and Yarn, with workflows for both single-package repositories and monorepos.

[![npm version](https://badge.fury.io/js/%40repodog%2Fcli.svg)](https://badge.fury.io/js/%40repodog%2Fcli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install

The CLI requires Node.js 20 or later. Git is needed for release commands and GitHub-based scaffolding.

```sh
npm install --save-dev @repodog/cli
```

Add a script to your project's `package.json`:

```json
{
  "scripts": {
    "repodog": "repodog"
  }
}
```

## Quick start

Set your defaults and view the available commands:

```sh
npm run repodog -- setup
npm run repodog -- --help
```

Use `new` to scaffold projects, `cut` to prepare releases and `publish` to publish packages. Each command is described below with examples and configuration options.

With a local installation, run commands through `npm run repodog --`, `pnpm repodog` or `yarn repodog`. The examples below use the shorter `repodog` form.

## Testing

Run `pnpm validate` from the Repodog root to check the CLI. See [Development](#development) for installation, unit tests and E2E tests.

## Commands

| Command | Purpose |
| --- | --- |
| `new <type> <subtype> [custom-type-path]` | Generate an application, repository or package. |
| `setup` | Create or update global `.repodogrc` defaults. |
| `cut <type>` | Update release versions, run hooks, commit, tag and push. |
| `publish` | Publish eligible public packages whose versions are not already on npm. |
| `postinstall <type> <subtype>` | Run dependency setup used by repository/package scaffolds. |

Use `repodog --help` or `repodog <command> --help` for the current command reference. Commands support `--verbose` for diagnostic logging and `--skip-node-version-check` (alias `--snvc`) to bypass the CLI's Node version check; bypassing it does not supply a compatible runtime.

### new

```sh
repodog new <type> <subtype> [custom-type-path]
```

Both `type` and `subtype` are required:

| Type | Subtypes | Source |
| --- | --- | --- |
| `app` | `nextjs`, `dotnet` | GitHub kickstarter plus its bootstrap manifest. |
| `repo` | `componentLibrary`, `library`, `monorepo` | Built-in [Hygen](https://www.hygen.io/) templates and optional additional templates. |
| `pkg` | `component`, `config`, `library` | Built-in [Hygen](https://www.hygen.io/) templates and optional additional templates. |

For example:

```sh
repodog new repo monorepo
repodog new pkg library cli
```

The optional `custom-type-path` selects more specific configuration and, for repo/pkg scaffolds, additional template folders. Separate multiple path segments with dots. `--exclude-builtin-templates` skips built-in [Hygen](https://www.hygen.io/) templates for repo/pkg scaffolds; it is rejected for application bootstraps.

#### Application bootstraps

`repodog new app nextjs` and `repodog new app dotnet` download a GitHub starter and customize it for your project. Supply an optional counterpart repository to connect the two applications, or leave it blank for standalone generation.

See [Application bootstrap reference](#application-bootstrap-reference) for starter selection, pairing and manifest configuration.

### setup

```sh
repodog setup
```

Interactively configure global defaults in your home directory's `.repodogrc`, including package manager, language and paths to additional templates, question overrides and template variables. Existing values populate the prompts. Project configuration can override these defaults.

### cut

```sh
repodog cut patch
repodog cut prerelease --tag beta --preid preview
repodog cut minor --dry-run
```

`cut` supports `major`, `premajor`, `minor`, `preminor`, `patch`, `prepatch` and `prerelease`; the special `dry-run` type finalizes a previously prepared dry run. It detects changed packages, updates versions and runs configured lifecycle hooks. For a monorepo, it handles workspace package versions and dependencies.

A normal cut stages all changes, creates a release commit, pushes the branch, creates an annotated `v<version>` tag and pushes that tag to `origin`. The commit and pushes bypass Git hooks. Run it from the intended release branch with the changes you want included.

| Option | Behavior |
| --- | --- |
| `--dry-run` | Prepare version and changelog changes without the release commit, tag or push; lifecycle hooks still run. |
| `--filter <glob>` | Limit monorepo package selection. |
| `--force` | Increment versions even when no changed files are detected. |
| `--tag <tag>` | Choose `alpha`, `beta`, `pr` or `unstable` release tagging. |
| `--preid <id>` | Supply the prerelease identifier. |
| `--skip-prehook` | Skip `cut:pre-version`. |
| `--skip-posthook` | Skip `cut:post-version`. |

A dry run changes files and records its pending state in `.repodogrc`. To commit, tag and push that prepared release, run:

```sh
repodog cut dry-run
```

#### Release hooks

Define hooks in `package.json` using your project's existing tasks:

```json
{
  "scripts": {
    "cut:pre-version": "npm run validate",
    "cut:post-version": "npm run build",
    "cut:changelog": "changelog"
  }
}
```

`cut:pre-version` runs before version changes; `cut:post-version` runs afterwards. When present, `cut:changelog` runs with the release type and new version passed as arguments, before the release commit. Omitting a hook skips that task.

### publish

```sh
repodog publish --verbose
```

From a single-package repository, this considers the root package; from a monorepo, it iterates workspace packages. Only packages with `publishConfig.access` set to `public` are eligible, and versions already present on npm are skipped. Publishing uses the detected package manager and derives the distribution tag from the version's supported prerelease suffix.

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

For a package's first publication, supply `NPM_AUTH_TOKEN` through the environment; the CLI uses a temporary npm authentication file and removes it afterwards. Subsequent publications use the package manager's existing registry authentication, which may be configured locally or through CI trusted publishing. Repodog does not configure trusted publishing for you. This command publishes packages; it does not build, validate or cut their versions first.

### postinstall

```sh
repodog postinstall repo library
```

This is a scaffolding support command for generated repositories and packages. It installs missing peer dependencies for their Repodog development dependencies. Application bootstraps do not use this command; follow their own setup instructions.

## Configuration

Repodog reads JSON configuration from `.repodogrc` in the current working directory and from your home directory. Global values are loaded first, then project values are merged over them. Run commands from the relevant project root; `repodog setup` writes global defaults.

A minimal project configuration is:

```json
{
  "packageManager": "pnpm",
  "language": "typescript"
}
```

The package manager is detected from a local lockfile before falling back to configuration: `package-lock.json`, `pnpm-lock.yaml`, then `yarn.lock`. Without an explicit language, the CLI selects TypeScript when the current directory contains `tsconfig.json`, otherwise JavaScript. A .NET application bootstrap does not require JavaScript package-manager configuration.

`questionOverridesPath` and `templateVariablesPath` load additional JSON configuration; inline values are merged over the values loaded from those files. Relative paths resolve from the current working directory, so use absolute paths for global file references.

### Scaffolding configuration

The following settings customize `new`. Application source selection is documented under [Application bootstraps](#application-bootstraps).

#### `additionalTemplatesPath`

Include additional templates as part of the set of templates used to generate a folder structure. You can use the `type`, `subtype` and `custom-type-path` options to target specific template sets based on the folder structure within your additional templates path.

The additional templates path is relative to the current working directory if declared in a project config or absolute if declared in a global config.

Repository and package scaffolding uses [Hygen](https://www.hygen.io/); additional templates must follow its conventions. Application bootstraps use their manifests instead.

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

#### `questionOverrides`

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

#### `questionOverridesPath`

Path to the JSON file containing your question overrides. The file adheres to the same structure as in the example above, except the content is not nested within a `questionOverrides` property.

The path is relative to the current working directory if declared in a project config or absolute if declared in a global config.

#### `templateVariables`

Values to populate your templates with. You can use the `type`, `subtype` and `custom-type-path` options to target the variables to specific template sets. The config allows for variables to be applied to all templates or a branch of templates through the `*` character.

Template variables are flattened and merged and the output is passed into the templates. If a key matches a question name, its value becomes the question's initial answer.

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

#### `templateVariablesPath`

Path to the JSON file containing your template variable overrides. The file adheres to the same structure as in the example above, except the content is not nested within a `templateVariables` property.

The path is relative to the current working directory if declared in a project config or absolute if declared in a global config.

## Continuous integration

The shared pipelines install dependencies and run available `syncpack`, `build`, `format`, `lint`, `type-check` and `test` scripts. Tag builds also invoke `repodog publish`. Keep the required tool versions in `.tool-versions`, provide the appropriate project scripts, and configure publishing credentials separately. These publishing pipelines are distinct from the kickstarters' cross-repository browser-test workflows.

### GitHub Actions

The reusable workflow defaults to pnpm; set its `package-manager` input to `npm` or `yarn` when appropriate. Configure `NPM_AUTH_TOKEN` as a repository or organization Actions secret available to this workflow; the current workflow requires that secret and checks it before tag publication.

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
    permissions:
      contents: read
      id-token: write
    uses: badbatch/repodog/.github/workflows/master-build-and-publish.yml@main
    secrets:
      npm_auth_token: ${{ secrets.NPM_AUTH_TOKEN }}
```

### Azure DevOps

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

## Development

Use the Node.js and pnpm versions in the [root package.json](../../package.json). From the Repodog root, install dependencies and run validation:

```sh
pnpm install --frozen-lockfile
pnpm validate
```

Validation builds and tests with Babel and SWC, then runs dependency checks, linting, formatting and TypeScript checks. Run `pnpm test` for the unit suite alone.

### End-to-end tests

These tests generate applications with the built CLI, then run their validation and browser tests. Run them separately from the unit suite:

```sh
pnpm test:e2e:cli
```

This command builds Repodog first and runs three scenarios sequentially:

- Standalone Next.js: generate without a counterpart, install dependencies, run `pnpm validate` and server integration tests, and check paired workflow/tooling removal.
- Standalone .NET: generate without a counterpart, restore tools/dependencies, check CSharpier formatting, build with warnings as errors, run tests, and check paired workflow removal.
- Paired applications: generate sibling Next.js and .NET apps, validate both, then run the generated Next.js app's `test:e2e:docker` suite against the generated API.

Tests live under [cli/new/e2e/](../new/e2e/), separate from the normal `src/**/*.test.ts` unit suite. They use the existing `.repodogrc` question overrides and template variables to supply answers without prompts; they do not mock the CLI or call its source generator directly. Generated apps are not initialized as Git repositories; no commits or remote repositories are created.

#### Prerequisites

Make Git, the Node/pnpm versions required by Repodog and compatible tool versions from each starter's `.tool-versions` available on `PATH`; [mise](https://mise.jdx.dev/getting-started.html) can install and activate them. Docker must be running for .NET integration tests and paired browser tests. Network access is required for GitHub, package restores and container images; configure Git authentication separately if selecting private starters. The suite uses the active tools on `PATH` and does not install toolchains itself.

#### Starter revisions

By default, tests download `main` from `badbatch/repodog-nextjs-kickstarter` and `badbatch/repodog-dotnet-kickstarter`. To check changes on a published branch, tag or commit, override the source revisions:

```sh
CLI_E2E_NEXTJS_REF=my-template-branch \
CLI_E2E_DOTNET_REF=my-template-branch \
pnpm test:e2e:cli
```

`CLI_E2E_NEXTJS_REPOSITORY` and `CLI_E2E_DOTNET_REPOSITORY` can also override the GitHub `owner/repository`. Local uncommitted starter changes are not downloaded. Each command has a 20-minute timeout; each scenario has a 30-minute timeout. The tests are deliberately opt-in and are not added to normal validation or publishing workflows.

#### Results and cleanup

Generated apps use temporary directories. Successful scenarios remove their directory; failed scenarios retain it and print the path for inspection, including any test reports. Delete retained directories after investigating. The generated Docker runner removes its Compose stack and volumes after a normal run, including test failures. These local tests do not verify GitHub permissions or execute hosted workflows.

## Application bootstrap reference

```sh
repodog new app nextjs
repodog new app dotnet
```

Application scaffolding downloads the corresponding GitHub kickstarter, asks for its name, description, GitHub owner and optional counterpart repository, and applies the starter's `.repodog-bootstrap.json` manifest. The two application commands create separate folders. Supplying a counterpart wires the Next.js/.NET pair together; leaving it blank keeps validation independent and omits cross-repository E2E workflows and paired Docker tooling. The Next.js app still expects a backend implementing its endpoint contract; that backend need not be .NET. Generate each application separately and supply the other repository's name as its counterpart; there is no single command that creates both applications.

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

Existing `questionOverrides` and `templateVariables` conventions apply under `new.app.nextjs` and `new.app.dotnet`. An optional custom type path selects more specific configuration defaults; application generation does not apply [Hygen](https://www.hygen.io/) overlays or `additionalTemplatesPath`. `--exclude-builtin-templates` is rejected for applications.

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

Generation prepares a temporary copy before creating the destination, refuses existing folders, and records the repository, requested ref and resolved commit in `.repodog-origin.json`. Source Git history and the bootstrap manifest are omitted. No dependency installation, lifecycle scripts, Git initialization, commits, pushes or GitHub repository creation run automatically. Use `--verbose` to see the source revision and suggested setup commands. A .NET application does not require JavaScript package-manager configuration.

`whenMissing` optionally maps a variable name to `exclude` paths and `fileReplacements` (`file`, `from`, `to`). These apply before normal substitutions when that variable is missing or blank. The supplied starters use it to remove counterpart-dependent tooling and update workflows and documentation for standalone generation.

When generating a paired setup, after publishing the repositories, configure `CROSS_REPO_READ_TOKEN` and reusable-workflow access for their cross-repository E2E jobs.

## Changelog

Check out the [features, fixes and more](../../CHANGELOG.md) that go into each major, minor and patch version.

## License

@repodog/cli is [MIT Licensed](LICENSE).
