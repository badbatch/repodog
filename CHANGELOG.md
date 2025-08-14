# Changelog

## 2.0.9 (2025-08-14)

### Bug Fixes

* **storybook-config:**  downgrade globby version (a97adae5)

## 2.0.8 (2025-08-14)

### Bug Fixes

* **storybook-config:**
  * lock file (267f4cd8)
  * remove disused deps (5143e208)

## 2.0.7 (2025-08-13)

### Bug Fixes

* **new:**  remove invalid eslint config (88d38e56)

## 2.0.6 (2025-08-13)

### Refactors

* **new:**  update templates (d3c935c9)

## 2.0.5 (2025-08-12)

### Bug Fixes

* **root:**  vulnerabilities (ff59a85f)

## 2.0.4 (2025-08-11)

### Bug Fixes

* **eslint-config:**  change how comments plugin is used (7e30abd4)

## 2.0.3 (2025-08-11)

### Chores

* **root:**
  * upgrade pnpm (02de0d6d)
  * upgrade deps (76ffe4cd)
  * force commit (d173900d)

## 2.0.2 (2025-06-13)

### Chores

* **root:**  minor update (1115725d)

## 2.0.1 (2025-06-02)

### Bug Fixes

* **new:**  move to reading file from import due to swc compiling issue (bc997488)

## 2.0.0 (2025-05-28)

## 1.7.77 (2025-05-28)

### Chores

* **root:**  bump deps (bb3c22b0)

## 1.7.76 (2025-05-28)

### Refactors

* **jasmine-browser-config:**  update deps (8c0619cf)

## 1.7.75 (2025-05-28)

### Bug Fixes

* **root:**  update various readmes to fix examples to esm (cb2aa5b4)

## 1.7.74 (2025-05-23)

### Bug Fixes

* **root:**  vulnerabilities (9d0a9887)

### Refactors

* **rollup-config:**  move to .mjs and add macros plugin (63dfd72d)

## 1.7.73 (2025-03-14)

### Bug Fixes

* **rollup-config:**  use on windows (33a13da4)

## 1.7.72 (2025-02-25)

### Bug Fixes

* **root:**  vulnerabilities (76b6fb6c)
* **new:**  replace assert with with (7e4e6ecc)

## 1.7.71 (2025-01-04)

### Bug Fixes

* **eslint-config:**  update ignore list (1bae67c4)

## 1.7.70 (2025-01-04)

### Chores

* **root:**  add asertion to json import (7dffa380)

### Bug Fixes

* **eslint-config:**  exclude next and idea folders (57e53cd7)
* **setup:**  add import json assert (acc657d0)

## 1.7.69 (2024-12-23)

### Bug Fixes

* **root:**  vulnerabilities (904176cb)

### Refactors

* **babel-config:**  more back to using core-js to match swc` (297b83c9)

## 1.7.68 (2024-12-18)

### Bug Fixes

* **eslint-config:**  add test and tests folder to rule (a851c972)

## 1.7.67 (2024-12-13)

### Documentation Changes

* **core:**  minor update to readme (5bd50e25)

### New Features

* **core:**  support skip node version check alias (0466f9bd)

## 1.7.66 (2024-12-10)

### New Features

* **swc-config:**  support decorators (4af1a723)

## 1.7.65 (2024-12-09)

### Chores

* **eslint-config:**  upgrade deps (35e35c33)

## 1.7.64 (2024-11-20)

### Bug Fixes

* **repodog:**  remove mise from postinstall (d27f8645)

## 1.7.63 (2024-11-18)

### New Features

* **jest-config:**  add support for inline snapshots (e8004409)

## 1.7.62 (2024-11-17)

### Bug Fixes

* **repodog:**  lock file (730d718e)
* **rollup-config:**  sort issue with import aliases not being bundled (c3980c0d)

## 1.7.61 (2024-11-17)

### New Features

* **rollup-config:**  add alias plugin (d0a46762)

## 1.7.60 (2024-11-16)

### New Features

* **repodog:**  support esm imports path aliases (679f49d3)

## 1.7.59 (2024-11-09)

### Bug Fixes

* **swc-config:**  js getter had wrong index (cee428c5)
* **repodog:**  remove dependabot version updates (069514c1)

## 1.7.58 (2024-11-09)

### Refactors

* **webpack-config:**  put source map loader/plugin behind debug flag (d6f28fc2)

## 1.7.57 (2024-11-08)

### Bug Fixes

* **swc-config:**  add dynamic import flag (d721eca2)

## 1.7.56 (2024-11-08)

### Bug Fixes

* **webpack-config:**  update docs and test config (2556f1cc)

## 1.7.55 (2024-11-08)

### Refactors

* **webpack-config:**  add cli peer dep (ecae0ea0)

## 1.7.54 (2024-11-07)

### Bug Fixes

* **eslint-config-jasmine:**  another attempt at getting config to work (5d9a1a47)

## 1.7.53 (2024-11-07)

### Refactors

* **eslint-config-jasmine:**  update config to get working (5fa4afec)

## 1.7.52 (2024-11-07)

### Bug Fixes

* **eslint-config-jasmine:**  use new config style (a4bc1919)

## 1.7.51 (2024-11-03)

### Chores

* **storybook-config:**  bump dep version (23571e6b)

### Documentation Changes

* **eslint-config:**  add comment to rule (2eae9f77)

## 1.7.50 (2024-11-02)

### Bug Fixes

* **eslint-config:**  sort broken rule config (ae6e9e05)

## 1.7.49 (2024-11-02)

### Bug Fixes

* **ts-config:**  add additional lib entry (7313a329)

## 1.7.48 (2024-11-01)

### Refactors

* **ts-config:**  update libs (60aa31dd)

## 1.7.47 (2024-10-31)

### New Features

* **repodog:**  enforce no casting / non-null asserting (82ed2ec3)
* **new:**  add support for mise (05e591e8)
* **syncpack-config:**  move to carat for peers (72e95733)
* **eslint-config:**  add object shorthand rule (fc07df05)

### Bug Fixes

* **repodog:**
  * address vulnerabilities (a9229345)
  * prefix cicd cmds with mise x -- (c29c1e24)

### Refactors

* **repodog:**
  * change to get mise tools in path again (40f440f3)
  * change to get mise tools in path (d971cc8d)
  * update azure pipeline to support mise (c532e806)
  * update github actions to fix mise integration (e3f5cd99)
  * update github actions config to work with mise (ae83aad0)

## 1.7.46 (2024-09-26)

### Documentation Changes

* **eslint-config,prettier-config:**  use correct eslint conmment (c9f42117)

### Refactors

* **new:**  update templates (679adfac)

## 1.7.45 (2024-09-25)

### Chores

* **core:**  remove unused deps (05178f7d)

### Documentation Changes

* **babel-config:**  fix typo (d8ae6b34)
* **repodog:**  change json to jsonc for code blocks (8b145730)

### New Features

* **cut:**  enable filtering of command with glob (719dc902)

### Bug Fixes

* **repodog:**
  * remove stale active dry run flag (cd7bc8ca)
  * add overrides for vulnerabilities (d1fbf9b6)

### Refactors

* **repodog:**
  * upgrade cli deps (f133f409)
  * update deps and fix issues from that (3a562c4d)

## 1.7.44 (2024-09-25)

### Chores

* **core:**  remove unused deps (05178f7d)

### Refactors

* **repodog:**  update deps and fix issues from that (3a562c4d)

## 1.7.43 (2024-09-21)

### Bug Fixes

* **repodog:**  bump cli packages from alpha (8ee9814d)

## 1.7.42 (2024-09-21)

### New Features

* **repodog:**  update version to match libs they track (8d6b5f0b)

### Bug Fixes

* **repodog:**  lock file (96bfab93)

## 1.7.42-alpha-12345.1 (2024-09-08)

### Refactors

* **jest-config:**  update deps (98abb6a5)

## 1.7.42-alpha-12345.0 (2024-09-08)

### Chores

* **ts-config:**  bump dep (3a4caf24)
* **repodog:**
  * save work in progress (90fb49fa)
  * bump dep (7d0b9ac7)

### Documentation Changes

* **markdownlint-config:**  update readme (6d7b0e86)
* **jasmine-browser-config:**  update readme (19e8de5b)

### New Features

* **eslint-config-jest:**  update deps (3e019dba)
* **eslint-config-jasmine:**  update deps (71d759a1)
* **prettier-config:**  upgrade deps (acb9a6ff)
* **commitlint-config:**  update deps (a6aba10e)
* **babel-config:**  upgrade deps and config (433963db)

### Bug Fixes

* **core:**  add back in missing .argv to yargs init (50f6bfbc)
* **repodog:**  eslint peer error (6dc12e57)
* **eslint-config:**
  * add prettier dev dep (dae5fb59)
  * get all rules working (806fe460)

### Refactors

* **webpack-config:**  update package (3e3f7165)
* **syncpack-config:**  update package (3ac44499)
* **swc-config:**  update library (31e439d1)
* **storybook-config,babel-preset:**  upgrade deps and update (3bf741aa)
* **rollup-config:**  update deps (821e43ee)
* **jest-config:**  upgrade deps (efa0a59f)
* **eslint-config-react:**  move to v9 (d320cfa3)
* **eslint-config-playwright:**  upgrade to v9 (36d97854)
* **commitlint-config:**  move dep from peer (0e57d951)
* **babel-config:**  change way plugins and presets are used (ab34eff1)
* **repodog:**  eslint fixes (232234eb)
* **eslint-config:**  upgrade to v9 and refactor config (b43d785d)

## 1.7.41 (2024-08-09)

### Bug Fixes

* **cut,publish,utils:**  stop shell commands from failing silently (384856ec)

## 1.7.40 (2024-07-04)

### New Features

* **eslint-config:**  exclude type def files from naming conv (35b15ced)

### Bug Fixes

* **cut:**  remove check if version is less than latest in npm (3de32505)

## 1.7.39 (2024-05-23)

### Bug Fixes

* **publish:**  stop preventing older version of package being published (0da62cc8)

## 1.7.38 (2024-05-03)

### Bug Fixes

* **jest-config:**  change ext order to cater for files in same dir (674548aa)

## 1.7.37 (2024-04-24)

### Refactors

* **babel-config,jest-config:**  remove TEST_ENV flag as redundant (214a563d)

## 1.7.36 (2024-04-22)

### Bug Fixes

* **utils:**  bug in prerelease digit incrementing (17fb72f5)

## 1.7.35 (2024-04-08)

### New Features

* **syncpack-config:**  add overrides range (ec20005e)
* **new:**  add readme generator to component library template (c6236748)

## 1.7.34 (2024-04-05)

### Refactors

* **storybook-config:**  make some peer deps optional (e79a465f)

## 1.7.33 (2024-03-25)

### Bug Fixes

* **new:**  update component library template (d2bd6bd6)

## 1.7.32 (2024-03-18)

### Documentation Changes

* **webpack-config:**  correct code examples (7216dfef)

### Bug Fixes

* **webpack-config:**  typo in method name (aa81f411)

## 1.7.31 (2024-03-14)

### Chores

* **repodog:**  whitespace (f618e24b)

### New Features

* **storybook-config:**  add axe and chromatic deps (807b5c94)

### Bug Fixes

* **repodog:**  build for prod in pipeline (2f42b4f9)

## 1.7.30 (2024-03-04)

### Bug Fixes

* **core:**  changelog link path (c1c002a4)

## 1.7.29 (2024-02-29)

### Chores

* **deps:**  bump @types/semver from 7.5.7 to 7.5.8 (78779315)

### New Features

* **new,repodog:**  add markdownlint into validate script (3d76296b)

### Bug Fixes

* **cut,core,utils:**  allow pr tag and update docs (6f12f4d0)

## 1.7.28 (2024-02-28)

### Chores

* **repodog:**  update package lock (ba5bd0a7)
* **deps-dev:**
  * bump eslint from 8.29.0 to 8.57.0 (ee2c19ef)
  * bump eslint-plugin-sort-class-members (35634644)

### New Features

* **cut:**  enable preid to be passed in (6d945792)

## 1.7.27 (2024-02-27)

### Bug Fixes

* **cut:**
  * changelog formatter (83634d33)
  * update changelog formatting regexes (a52b33de)
* **repodog:**  changelog typo (b3c6fa97)

### Other Changes

* **cut:**  update changelog formatting regexes" (6cba0d8b)

## 1.7.26 (2024-02-27)

### Chores

* **deps-dev:**  bump @typescript-eslint/parser from 5.46.0 to 5.62.0 (e975f410)
* **deps:**  bump @types/shelljs from 0.8.11 to 0.8.15 (0ca76cb4)

### New Features

* **cut:**
  * add logging to changelog normalisation code (b1e6658f)
  * format changelog (c8130539)
* **repodog:**  add root name to commitlint scopes (d2fad937)

### Bug Fixes

* **cut:**
  * move markdown linting to last step (eeb6c63c)
  * use dev dependencies rather than dependencies (ed3d56df)
* **repodog:**  package lock mismatch (d967345b)

### Refactors

* **repodog:**  add logo and update name everywhere (38d1022f)

## 1.7.25 (2024-02-23)

### Bug Fixes

* **new:**  update templates for component library (f5e6d91d)

## 1.7.24 (2024-02-23)

### Refactors

* **new,postinstall,utils:**  move valid repo type code to utils (ded01dad)

## 1.7.23 (2024-02-23)

### Chores

* **deps-dev:**
  * bump husky from 8.0.3 to 9.0.11 (068e761c)
  * bump type-fest from 3.5.1 to 4.10.3 (829c8c78)
  * bump eslint-plugin-jest from 27.2.1 to 27.9.0 (398470b7)
  * bump @types/node from 20.11.0 to 20.11.20 (44a314c9)
* **deps:**
  * bump semver and @types/semver (d2408ace)
  * bump package-json from 8.1.1 to 9.0.0 (db24c69e)

### New Features

* **new:**  add new commitlint config to templates (e052ecf6)
* **commitlint-config:**  dynamically generate and enforce scopes (19cc1327)

### Bug Fixes

* update lock file (b48bcc06)
* package lock (add86307)
* minor tweaks (24c65831)

### Refactors

* add other changes to support husky upgrade (0941c9fe)

## 1.7.22 (2024-02-23)

### Refactors

* stop throwing error when versions match in publish (5b4691d5)

## 1.7.21 (2024-02-22)

### Bug Fixes

* update unit test (e07e9535)
* move change dir to root into loop (fc54ffa1)

## 1.7.20 (2024-02-22)

### Bug Fixes

* don't change directory until pkg version is checked (4432df2c)

## 1.7.19 (2024-02-22)

### Bug Fixes

* set swc jest sourcemaps to inline (1be3c1f5)

## 1.7.18 (2024-02-22)

### Bug Fixes

* add encoding into read file in scritps (c5de268f)

## 1.7.17 (2024-02-22)

### Bug Fixes

* license template in wrong directory (c86a5404)

## 1.7.16 (2024-02-22)

### Bug Fixes

* subtype enum wrong value (8e7a2e74)

## 1.7.15 (2024-02-22)

### Documentation Changes

* update readme (b8063148)

### New Features

* add config package templates (18af183b)

### Bug Fixes

* add missing content to config readme template (364e4482)

## 1.7.14 (2024-02-22)

### Chores

* add whitespace (1fe1c3f4)

### New Features

* add component library and component templates (ca044279)
* add question to choose platform for build yml (964ab61e)

### Bug Fixes

* update package lock (94b50b68)

## 1.7.13 (2024-02-21)

### Bug Fixes

* update story target glob to improve performance (6c1546e0)

## 1.7.12 (2024-02-20)

### Bug Fixes

* broken tests (38ad95f8)

## 1.7.11 (2024-02-20)

### New Features

* swap out changelog generator (a4c2af6c)

### Bug Fixes

* change order of changelog generator to pick up right version (ed901c56)

### Other Changes

* swap out changelog generator" (2ec28714)

### Refactors

* pass version to changelog generator (c16172b7)

## 1.7.9 (2024-02-20)

### New Features

* add exclude-builtin-templates flag to new script (cfa21a71)

## 1.7.8 (2024-02-19)

### Refactors

* remove pointless eslint plugin abstraction (6aa26870)
* change way eslint config is exported from package (f8d75b9f)

## 1.7.7 (2024-02-19)

### Bug Fixes

* update types to fix errors in consuming app (58c18d4c)

## 1.7.6 (2024-02-19)

### Refactors

* sort exports and types for storybook and swc configs (580ae5dc)

## 1.7.5 (2024-02-19)

### Bug Fixes

* add types to storybook config (e9dc4c62)

## 1.7.4 (2024-02-19)

### Bug Fixes

* update storybook config exports map (55bf6495)

## 1.7.3 (2024-02-19)

### Documentation Changes

* update azure devops example (02585ba1)

### New Features

* enable swc config to be passed into storybook (2e331acf)

### Refactors

* update azure devops template examples (3a3e95b5)

## 1.7.2 (2024-02-18)

### Bug Fixes

* update templates and more docs for swc usage (136db862)

## 1.7.1 (2024-02-18)

### Refactors

* get config to return ts and js options (41f19065)

## 1.7.0 (2024-02-18)

### New Features

* support swc config array (f9f86fa7)

## 1.7.0 (2024-02-18)

### Bug Fixes

* solve swc jest issue with tests being excluded (10d1b3e2)
* update swc config and rollup config to get them to work (45501860)
* misconfiguration of ts/js in swc config (6f9433c5)

### Refactors

* only bump package if internal package is deps (3be4e337)

## 1.6.3 (2024-02-17)

### Bug Fixes

* set jsx/tsx to true in swc config (61568021)

## 1.6.2 (2024-02-17)

### Bug Fixes

* formatting in readme (4440789a)

## 1.6.1 (2024-02-17)

### Documentation Changes

* add azure pipeline example config (5f676fba)

## 1.6.0 (2024-02-17)

### Bug Fixes

* type of code docs to improve json rendering (f6ccbdfa)

## 1.6.0-unstable.0 (2024-02-17)

### New Features

* add storybook config changes (1cd81f2e)

## 1.5.22 (2024-02-17)

### Documentation Changes

* update swc config readme (33e79c99)

### New Features

* add swc config and use in rollup and jest (016d4981)

### Refactors

* remove babel use in repo (1d5f0b61)
* use swc in repo and add webpack config (4ad6cbde)
* remove babel deps (15a9677b)

## 1.5.21 (2024-02-16)

### New Features

* improve logging of init func (5e02d3ae)

## 1.5.20 (2024-02-16)

### New Features

* add flag to skip node version check (f5632a8b)

## 1.5.19 (2024-02-16)

### Documentation Changes

* update commitlint docs (db647224)

### Bug Fixes

* bug in additional templates logic (384e6c54)
* bug in template when types file not excluded (7e246dc4)

### Other Changes

* upgrade commitlint config and fix husky issue" (ad05c292)

## 1.5.18 (2024-02-16)

### Documentation Changes

* update commitlint docs (db647224)

### Other Changes

* upgrade commitlint config and fix husky issue" (ad05c292)

## 1.5.17 (2024-02-13)

### New Features

* add accessibility addon for storybook config (78f7f57f)

### Bug Fixes

* package lock mismatch (1d663986)

## 1.5.16 (2024-02-12)

### New Features

* add storybook config (cad544bc)

### Bug Fixes

* packge lock mismatch (3147a3ae)

## 1.5.16-unstable.0 (2024-02-11)

## 1.5.15-unstable.0 (2024-02-11)

### Refactors

* change check of override template flag (16ba4db4)

## 1.5.14-unstable.0 (2024-02-11)

### Bug Fixes

* remove typo in template frontmatter (8c8b44b1)

## 1.5.13-unstable.0 (2024-02-11)

### Bug Fixes

* duplicate mapping key in frontmatter of template (8b4ce792)

## 1.5.12-unstable.0 (2024-02-11)

### Refactors

* change way of excluding default templates (f8557a74)

## 1.5.11-unstable.0 (2024-02-11)

### Bug Fixes

* broken unit test (04f888ab)
* allow false to be passed as query param (ce01712b)

## 1.5.10-unstable.0 (2024-02-11)

### Bug Fixes

* generate override template vars for all internal templates (a8f94f4b)

## 1.5.9 (2024-02-11)

### Refactors

* only render templates that do not have overrides (54089682)

## 1.5.8 (2024-02-10)

### Bug Fixes

* pkg library index template did not use template var for name (f2181d04)

## 1.5.7 (2024-02-09)

### Bug Fixes

* wrong eslint config referenced in monorepo template (c56c74ef)

## 1.5.6 (2024-02-08)

### Bug Fixes

* only run postinstall when type is repo (3c6859fc)

## 1.5.5 (2024-02-08)

### Bug Fixes

* tsconfig template missing esm in output path (c99f332d)

## 1.5.4 (2024-02-08)

### Bug Fixes

* rollup config path in package template package json (4534d144)

## 1.5.3 (2024-02-08)

### Bug Fixes

* template package json missing cts type code (7dee4aa0)

## 1.5.2 (2024-02-08)

### New Features

* add monorepo template for repo (3a6b2076)

### Bug Fixes

* postintall exception and package manager refs in package json (1bb145ba)

## 1.5.1 (2024-02-06)

### New Features

* update markdown lint and eslint configs (2fe65149)

## 1.5.0 (2024-01-12)

### Chores

* update deps (29f05849)

## 1.4.0 (2024-01-07)

### Refactors

* ts-config extends and all package exports map (e0a53fd9)

## 1.3.7 (2024-01-06)

### Chores

* **deps:**  bump @babel/traverse from 7.20.5 to 7.23.6 (daced629)

### Refactors

* remove cjs configs as they are redundant and not correct (af72ca67)
* rearrange npm script (5ec061f1)

## 1.3.6 (2023-12-19)

### Bug Fixes

* remove srFiles from jasmine config (1f28b00a)

## 1.3.5 (2023-12-18)

### Bug Fixes

* add browser main field back into webpack config (c19a92f2)

## 1.3.4 (2023-12-18)

### Bug Fixes

* webpack build for pnpm monorepos (f9975301)

## 1.3.3 (2023-12-18)

### Bug Fixes

* glob error in webpack config (49182cb8)

## 1.3.2 (2023-12-13)

### New Features

* add log util (fdf7084e)

### Bug Fixes

* postinstall version bug and no shadow eslint (e90c3acf)

## 1.3.1 (2023-12-08)

### Chores

* **deps:**
  * bump semver from 7.3.8 to 7.5.2 (c5f365b9)
  * bump word-wrap from 1.2.3 to 1.2.5 (d4911662)

### New Features

* allow namesapce to be passed in to setVerbose (89a11736)

## 1.3.0 (2023-12-08)

### Bug Fixes

* post install script not executing (0b01b674)

## 1.2.7 (2023-12-08)

### New Features

* upgrade node and pnpm (445c07f1)

## 1.2.6 (2023-12-08)

### Refactors

* update react eslint config (1d5beae2)

## 1.2.5 (2023-11-26)

### New Features

* support cjs in ts config (e20032fc)

### Bug Fixes

* typo in package json (8b134834)

## 1.2.4 (2023-11-23)

### Bug Fixes

* update template to use new syncpack commands (b5383948)

## 1.2.3 (2023-11-22)

### New Features

* reimplement syncpack upgrade (1c6adcde)

## 1.2.2 (2023-11-22)

### Bug Fixes

* update script name and templates (52b5fff9)

## 1.2.1 (2023-11-22)

### New Features

* move to exports for cli packages (e6de9a39)

## 1.2.0 (2023-11-22)

### New Features

* add exports to syncpack sort and fix glob version mismatch (92559090)

## 1.1.29 (2023-11-22)

### Bug Fixes

* package json whitespace (d1e8f17e)

### Other Changes

* revert save work in progress (4f48c0d4)
* revert change workspace references and add syncpack validation (0e8a616a)

## 1.1.28 (2023-11-19)

### Bug Fixes

* package json whitespace (1638c6cc)

### Refactors

* add commonjs output to rollup and change babel env var (984793c1)

## 1.1.27 (2023-11-17)

### New Features

* add support for cjs builds with rollup (8dad12be)

### Bug Fixes

* change path to dist output (125f9af3)

## 1.1.26 (2023-11-17)

### Bug Fixes

* update package lock (5fb9726f)

## 1.1.25 (2023-11-17)

### New Features

* add commonjs support into babel plugin (25124452)

## 1.1.24 (2023-10-31)

### New Features

* disable no reduce rule and update func scope rule (ef0a9062)

### Bug Fixes

* add promise lib to typescript (e196e662)

## 1.1.23 (2023-10-28)

### New Features

* add ctx to abbrev whitelist (286c81f3)

## 1.1.22 (2023-10-27)

### Bug Fixes

* add plugin-proposal-decorators (a7540648)

## 1.1.21 (2023-10-26)

### Bug Fixes

* allow leading underscore in variable names (75e23500)

## 1.1.20 (2023-10-25)

### Bug Fixes

* update prefer arrow rule to omit class props (2303b992)

## 1.1.19 (2023-10-25)

### New Features

* add prefer arrow func rule (202cf259)

## 1.1.18 (2023-10-24)

### New Features

* add to abbrev list (1328243b)

### Refactors

* swap babel proposal plugins for shipped ones (f601b357)
* remove setup from jest config (9592af8c)

## 1.1.17 (2023-10-16)

### Bug Fixes

* set carat versions when adding peer deps (b0787295)

## 1.1.16 (2023-10-16)

### Bug Fixes

* postinstall peer dependency defensive coding (49a536fd)

## 1.1.15 (2023-10-15)

### New Features

* use library to load package json from npm reg (ba2aab8a)

## 1.1.14 (2023-10-15)

### Chores

* add logging for postinstall script (a3c17ccf)

## 1.1.13 (2023-10-15)

### New Features

* add fetch polyfil to jest setup (88b3c287)

## 1.1.12 (2023-10-12)

### New Features

* add to abbrev whitelist (9a952ca1)

## 1.1.11 (2023-10-12)

### Bug Fixes

* path in webpack output (bb7c430a)

## 1.1.10 (2023-10-11)

### Refactors

* break out eslint configs and add jasmine and webpack (781fac64)

## 1.1.9 (2023-09-29)

### Chores

* update package json linting (bd78b972)

### Other Changes

* remove synthetic default imports""" (7d2cf332)
* remove synthetic default imports"" (602a89c8)
* remove synthetic default imports" (1951e044)

### Refactors

* move to lodash-es (5d916b61)
* remove synthetic default imports (4a8d985e)

## 1.1.8 (2023-09-28)

### New Features

* add playwright eslint config (e113c92c)

## 1.1.7 (2023-09-28)

### Documentation Changes

* update eslint docs (e5f99d5b)

## 1.1.6 (2023-09-28)

### Bug Fixes

* add jsdom jest package into peers (012e98ee)

### Refactors

* pull out jest eslint config into separate config (3e39fd94)
* add jest env node package (609cba82)
* allow typescript to remove any unused imports (4996ee25)
* add db to allowed abbrev (7ea6f683)

## 1.1.5 (2023-08-31)

### Bug Fixes

* add licences to all packages (c03d4b5d)
* typo in readmes (475f4562)

### Refactors

* turn off @typescript-eslint/consistent-type-definitions (5cbd5776)

## 1.1.4 (2023-08-14)

### Chores

* save work in progress (b5d8d203)

### Bug Fixes

* broken unit test (f63ce9a1)
* remove extra space from package jsons (9fe89f4d)

## 1.1.3 (2023-06-23)

### Bug Fixes

* align package json formatting (86aa155c)
* async error handling (1672de3d)

## 1.1.2 (2023-06-20)

### Bug Fixes

* enhance logging for async exec and update licence template (2d5ec6f3)

## 1.1.1 (2023-06-16)

### Bug Fixes

* downgrade unicorn eslint plugin (f06ddf61)
* add launch.json into templates (57afa9bc)

### Refactors

* update tests and fix minor bugs (53ae0005)

## 1.1.0 (2023-05-12)

### Bug Fixes

* add dependency to template (bdd9eb74)

### Refactors

* Rename isValidNewSubtype.test.ts to isValidNewSubType.test.ts (ea464470)

## 1.1.0 (2023-05-12)

### New Features

* add postinstall script (a3e53ad4)

### Bug Fixes

* remove preid option as redundant (257dc469)
* add types as peer and update template (01c28ad7)

### Refactors

* make library required subttytpe for new type (d7cbd0a5)

## 1.0.1 (2023-05-09)

### Chores

* remove reference to tbc new repo types (289ca0e1)

## 1.0.0 (2023-05-09)

## 1.1.2-alpha.0 (2023-05-08)

### Bug Fixes

* remove peer auto install (fd55a855)

## 1.1.1-alpha.0 (2023-05-08)

### Bug Fixes

* add husky into dev deps of template (58806365)

## 1.1.0-alpha.0 (2023-05-08)

### Refactors

* change way cwd is changed for new repo (1fc33af0)

## 1.0.15-alpha.0 (2023-05-08)

### New Features

* add check for node version at start of cli (d4c2faf8)
* enable jest eslint rules and fix issues (3145df7e)
* add syncpack config (67585fa7)

### Bug Fixes

* change way type paths are handled to fix hygen limitation (a3832fa0)
* remove full stop in desc (bda0a333)
* change to os separator (4e84a386)
* remove org reference from repo template (338d660e)
* add engine node to cli package json, add quotes to sh commands (eb626ac7)

### Refactors

* move templates and questions out of new folder (1a3b1d30)
* add auto install peers and repodog installs (14239a82)

## 1.0.14-alpha.0 (2023-04-26)

### Bug Fixes

* add back in json import type assert (9b7d4114)

## 1.0.13-alpha.0 (2023-04-26)

### Bug Fixes

* custom type path should not default to empty string (dc9c4ce9)

## 1.0.12-alpha.0 (2023-04-26)

### Bug Fixes

* remove empty string answers (2d71fae8)

## 1.0.11-alpha.0 (2023-04-26)

### Bug Fixes

* create and cd into new lib if not in correct folder (d6ce7557)

## 1.0.10-alpha.0 (2023-04-26)

### New Features

* add setup command (47597746)

### Bug Fixes

* add peers as deps, kebabcase arg (0d81e522)

## 1.0.9-alpha.0 (2023-04-13)

### Bug Fixes

* warnings (28c69d4d)
* subtype bug and add library questions (7e9826f1)

### Refactors

* change way mocks are structured (9e649b4c)
* move to .ts extensions with ts 5 (6762dd0e)
* upgrade typescript and add repo/lib templates (a9e378b9)

## 1.0.8-alpha.0 (2023-03-31)

### Documentation Changes

* add divider back in (86e9bb4b)
* remove dividers (eaaa21a7)
* minor wording change on readme (bfdca08a)

### New Features

* add validation of subtype in new script (a8276d5a)

### Bug Fixes

* move log messages (b03b01ea)
* versioning packages with versioned internal deps (28645924)

### Refactors

* get language and pass to template engine (c8b36822)
* add subtype for new repo command support (6cf2c651)
* update to write cmd arg casing (55194273)

## 1.0.8-alpha.0 (2023-03-20)

### New Features

* add write command (ee7605c2)
* new package script (402627b7)

### Refactors

* update shared files and utils to support write package (a97c7e79)
* remove babel lodash plugin (555160a5)
* make use of enums (9a876b38)

## 1.0.7-alpha.0 (2023-02-23)

### Bug Fixes

* typo in action workflow script (69d62563)

## 1.0.6-alpha.0 (2023-02-23)

### Bug Fixes

* change way npm auth token is injected in pipeline (da575152)

## 1.0.5-alpha.0 (2023-02-22)

### Bug Fixes

* make sure chdir is passed absolute path (88d504a0)

## 1.0.4-alpha.0 (2023-02-21)

### Bug Fixes

* adding change directory into publish package flow (cb1b692f)

## 1.0.3-alpha.0 (2023-02-21)

### Refactors

* add verbose logging to publish command (4560bb8d)

## 1.0.2-alpha.0 (2023-02-21)

### Bug Fixes

* update how publish script is called in pipeline (d0e8f136)

## 1.0.1-alpha.0 (2023-02-21)

### Bug Fixes

* update package manager version in action (b6d780f7)

## 1.0.0-alpha.0 (2023-02-21)

### New Features

* move cutoff into repodog (8b4e53fb)
* add github workflows (d77fc9dd)
* add ability to cut dry run (0242505d)
* add duration log at end of cut handler (b01988da)

### Refactors

* remove all but config packages (42a1c280)
* move configs into own folder (a58acbed)
* update readmes (060a7d11)
* change npm script changelog is linked to (9fbf040a)
* allow any release type to generate changelog (ca891a0b)

## 0.3.53 (2020-03-03)

### Chores

* update cutoff ([22f6b928](https://github.com/badbatch/repodog/commit/22f6b928f8230086216d096c24dec38769435dba))
* update urls after moving repo ([82a3cd30](https://github.com/badbatch/repodog/commit/82a3cd30027c4e4924569a51b28c8656f7c15dd1))

### Bug Fixes

* **jest:**  change name of test folder ([c1a0efa1](https://github.com/badbatch/repodog/commit/c1a0efa14edd1860defa44dac5f0e9567197a295))

## 0.3.52 (2020-03-03)

### Bug Fixes

* **new-repo:**  remove boostrap cmd from package json ([30d5d3f9](https://github.com/badbatch/repodog/commit/30d5d3f9411f28d9a99db76e49440ced4d4ab37a))
* add codecov cmd to new repo/monorepo travis files ([f2645bda](https://github.com/badbatch/repodog/commit/f2645bda30a6437a7d973d79c86572aed1b16a4d))

## 0.3.51 (2020-03-03)

### Bug Fixes

* **new-repo:**  adding exists check on dir before make ([9e128870](https://github.com/badbatch/repodog/commit/9e12887053c2117cf8a656ea938117a74cbf9bc0))

## 0.3.50 (2020-03-02)

### Chores

* upgrade dependencies ([ee1cd2bc](https://github.com/badbatch/repodog/commit/ee1cd2bce5c59f52a235b2fe6fd0fa0110167ac2))

## 0.3.49 (2020-03-02)

### Bug Fixes

* change missed peer dependency version ([dda5c3cb](https://github.com/badbatch/repodog/commit/dda5c3cb56517a713912655cb0798811c235525d))
* peer dependency versioning ([47c874a7](https://github.com/badbatch/repodog/commit/47c874a792e2a7f178676bc2a0d248f4babc0c4b))

## 0.3.48 (2020-02-19)

### Bug Fixes

* add new tslint rule and exclude lib from jest ([aaed031b](https://github.com/badbatch/repodog/commit/aaed031b4311087b7cd8fc6bd033ed7a07a907cb))

## 0.3.47 (2020-01-21)

### New Features

* **rollup-config:**  upgrade babel plugin to use skip checks ([b470475e](https://github.com/badbatch/repodog/commit/b470475e31f65fdfc11c156f50b32aef9b0806aa))

### Bug Fixes

* add new rollup config to repo ([f13aaac8](https://github.com/badbatch/repodog/commit/f13aaac8c5362529af63915a1afd4e7809343d47))

## 0.3.46 (2020-01-21)

### New Features

* **rollup-config:**  upgrade babel plugin to use skip checks ([b470475e](https://github.com/badbatch/repodog/commit/b470475e31f65fdfc11c156f50b32aef9b0806aa))

## 0.3.45 (2020-01-21)

### Bug Fixes

* **babel-config:**  remove unnecessary cache config ([e3b43dc6](https://github.com/badbatch/repodog/commit/e3b43dc63fe2246f9d885073b43c09ca4d652d08))

## 0.3.44 (2020-01-21)

### New Features

* **babel-config:**  restrict caching to when babel env is same ([55b10bdd](https://github.com/badbatch/repodog/commit/55b10bdd504fb583741506a069882984a9ad0b39))

## 0.3.43 (2019-12-31)

### Chores

* **deps:**  bump handlebars from 4.1.2 to 4.5.3 ([#3](https://github.com/badbatch/repodog/pull/3)) ([0d5183df](https://github.com/badbatch/repodog/commit/0d5183df2e97f7612b92c36156d45843b30f44f1))

### Bug Fixes

* add enzyme to jest install if react feature is there ([25debfd6](https://github.com/badbatch/repodog/commit/25debfd6e271ebf899fb092bfe4d178d4786b3c4))

## 0.3.42 (2019-12-23)

### Bug Fixes

* update ignore patterns again ([185b628e](https://github.com/badbatch/repodog/commit/185b628ee84d4094e57e05f4611e8192e2456f31))

## 0.3.41 (2019-12-20)

### Bug Fixes

* updating folders in various ignore files ([757359b2](https://github.com/badbatch/repodog/commit/757359b2a83e08c3c2ab7a06b77ed14bebf1cb44))

## 0.3.40 (2019-12-20)

### Bug Fixes

* add test and mock folders to various configs ([f867c1b9](https://github.com/badbatch/repodog/commit/f867c1b9411bc6776b663336488b508f9e57ac67))

## 0.3.39 (2019-12-02)

### Bug Fixes

* **stylelint-config:**  add support for new babel plugins ([3c8817cb](https://github.com/badbatch/repodog/commit/3c8817cb12733d684cf3a30b2bd782ac50474ca8))
* add js and ts lints into linting npm script ([cabac679](https://github.com/badbatch/repodog/commit/cabac679e17b66484cd90739fe0171e4a8475102))
* **eslint-config:**  correctly split airbnb base and react rulesets ([1b744c51](https://github.com/badbatch/repodog/commit/1b744c51630f00d90df1bb2f198f11be7ead722f))

## 0.3.38 (2019-11-12)

### Chores

* update dependencies and fix issues ([ca58d25a](https://github.com/badbatch/repodog/commit/ca58d25a8ceb7a351c496846330686ec21e0f37c))

## 0.3.37 (2019-11-05)

### Bug Fixes

* **babel-config:**  update to deal with browser test env ([b5cedbce](https://github.com/badbatch/repodog/commit/b5cedbce405e10a8bac90b5948432e3939274440))

## 0.3.36 (2019-11-04)

### Documentation Changes

* add missing packages to main readme ([01d9506b](https://github.com/badbatch/repodog/commit/01d9506b72cd4353fb63a51b21add5edaac3edcc))
* update new repo/monorepo readme files ([a5e74136](https://github.com/badbatch/repodog/commit/a5e74136454b90190043af6af9cbef14de5eefd1))

### Bug Fixes

* **rollup-config:**  path to babel config broken for single repo ([9f143aeb](https://github.com/badbatch/repodog/commit/9f143aeb356939ba9f781dfade206c278818af16))
* update new repo/monorepo repo feature types ([af6eb1c7](https://github.com/badbatch/repodog/commit/af6eb1c74a06674aa5b46a6dfff6c6b54a79fd62))

## 0.3.35 (2019-10-31)

### Bug Fixes

* **new-monorepo:**
  * remove unused variables ([b246e2dc](https://github.com/badbatch/repodog/commit/b246e2dc0f38bbc9fac641a3a68e13fab827b60b))
  * add lerna version and remove build references ([b6931919](https://github.com/badbatch/repodog/commit/b6931919682a7df88d0f99afd0b53901634307c2))

## 0.3.34 (2019-10-28)

### New Features

* add npm packages to install logic ([b814e0d5](https://github.com/badbatch/repodog/commit/b814e0d5dfc0fd03a670da45ec1aa037c3c449f1))

## 0.3.33 (2019-10-24)

### Bug Fixes

* wrong dependency version ([2d335bb5](https://github.com/badbatch/repodog/commit/2d335bb50792165b0d379a8680cde2cab702311b))

## 0.3.32 (2019-10-24)

### Bug Fixes

* add config helpers to initial package dev dependencies ([58357496](https://github.com/badbatch/repodog/commit/583574966fb29acd56a67902a477da410c43e8c8))

## 0.3.31 (2019-10-23)

### New Features

* **new-repo:**  add logging to get package dependencies ([f25a8dba](https://github.com/badbatch/repodog/commit/f25a8dba044d017a28a37e390a115b2dd07e5e0b))

### Bug Fixes

* **constants:**  type error ([6eb6b4de](https://github.com/badbatch/repodog/commit/6eb6b4decbc95ff7e08f0771d0697d7b161552a6))
* add missing tsconfig to files list ([2be17510](https://github.com/badbatch/repodog/commit/2be1751029f48142c910ed23bae810cfe941b05d))

## 0.3.30 (2019-10-23)

### Bug Fixes

* update npmignore ([45c36a2a](https://github.com/badbatch/repodog/commit/45c36a2aefb807a78f81d4781eb0a32764122a08))
* change engine node version ([59f4fe21](https://github.com/badbatch/repodog/commit/59f4fe2111ba7b83547bbdc069b262f6ad57596a))
* revert node engine change ([1934cd2e](https://github.com/badbatch/repodog/commit/1934cd2e45dbae01fb39a4389c85661d2e7831b5))

## 0.3.29 (2019-10-23)

### Bug Fixes

* change repodog config to json file ([4256e187](https://github.com/badbatch/repodog/commit/4256e1874dce8258f8eaed63c798564fd9ccc170))
* change npmignore to be dynamically added ([6bb9010d](https://github.com/badbatch/repodog/commit/6bb9010d63bfb096e64d27eebfd236a214f31802))
* update repodog config ([fc32b77e](https://github.com/badbatch/repodog/commit/fc32b77ed2acd9ff56cf41ef4b27d53d1ed6d69e))

## 0.3.28 (2019-10-22)

### Chores

* upgrade node version and dependencies ([17bf5832](https://github.com/badbatch/repodog/commit/17bf5832d5894a3698aed1b99fbd32973332bde7))
* upgrade dependencies and introduce optional chaining ([10edd889](https://github.com/badbatch/repodog/commit/10edd8898a8f6bbcf4635681553297a15c987b71))

### New Features

* enable dependantOn within dependencies configs ([02a4e9c3](https://github.com/badbatch/repodog/commit/02a4e9c3d658b8c80007047e11f0521dae6f8469))
* adding dynamic dependencies to tslint config ([866b3e1c](https://github.com/badbatch/repodog/commit/866b3e1cad54110643584287ae8926ee7f4a2f6c))
* add dynamic dependencies to stylelint config ([b91e8d2e](https://github.com/badbatch/repodog/commit/b91e8d2e483413a2610986e3c47257f0948a9ba9))
* update rollup config to fix bugs and add dependencies ([25eee86b](https://github.com/badbatch/repodog/commit/25eee86bf48abc6ee77531cecb6c5190879377db))
* add writing of features to repo config ([377f23ad](https://github.com/badbatch/repodog/commit/377f23ad465709f44331f4ed4dd80ea3b6d1e71d))
* **babel-config:**  only load plugins that match features ([98755eb3](https://github.com/badbatch/repodog/commit/98755eb3f7aa42c95dd01ecf7af4e2f18fd4558f))

### Bug Fixes

* split included packages between single and multo package ([f9c4eeb3](https://github.com/badbatch/repodog/commit/f9c4eeb3cc1dc068c0c182e5603f14edd42cd229))

### Refactors

* update babel, eslint, jest to support dynamic ([70077984](https://github.com/badbatch/repodog/commit/70077984acf9a19bb9f79a33959e786115d88309))

## 0.3.27 (2019-09-25)

### Bug Fixes

* **new-repo:**  update npmignore ([37ffcf50](https://github.com/badbatch/repodog/commit/37ffcf50c15aed98f95bc386efc38dc8df1657d4))

## 0.3.26 (2019-09-25)

### Bug Fixes

* **new-repo:**  add main fields to scaffold package.json ([67df9f97](https://github.com/badbatch/repodog/commit/67df9f9747ee33453c80d2804569b7bbb3463494))

## 0.3.25 (2019-09-19)

### Bug Fixes

* **jest:**  add default test ignore pattern ([29cffa98](https://github.com/badbatch/repodog/commit/29cffa9874b33e0e66dee34fd9393944f8fe08c7))

## 0.3.24 (2019-09-18)

### Bug Fixes

* **types:**  replace Val with any in utils ([e9872ed8](https://github.com/badbatch/repodog/commit/e9872ed856575a909d0417efb8befac378ce25b6))

## 0.3.23 (2019-09-16)

## 0.3.22 (2019-09-16)

### Bug Fixes

* **ts-config:**  add module field into base config ([4f96309e](https://github.com/badbatch/repodog/commit/4f96309e591f3be25e70ac1f990188cc2f14d2d2))

## 0.3.21 (2019-09-15)

### Bug Fixes

* **jest, tsconfig:**  update configs to resolve install bugs ([e16463f0](https://github.com/badbatch/repodog/commit/e16463f0035cc2c9b0f7453ceb056dee5b81eb41))

## 0.3.20 (2019-09-13)

### Bug Fixes

* **lint:**  sort errors ([4bec627a](https://github.com/badbatch/repodog/commit/4bec627a32208930fc647c79b1bb23d6461ed8be))

## 0.3.19 (2019-09-13)

### Bug Fixes

* **new-repo/monorepo:**  remove version from peer dependencies ([1397525e](https://github.com/badbatch/repodog/commit/1397525ef4fdd06eb845f8f3bf5c7a427153e98b))

## 0.3.18 (2019-09-13)

### Bug Fixes

* **new-repo/monorepo:**  add version into peer dependency install ([9a4e398c](https://github.com/badbatch/repodog/commit/9a4e398c3fce4e38018d1551652cca05971532cf))

## 0.3.17 (2019-09-13)

### Bug Fixes

* **new-repo/monorepo:**  add load nvm to scripts ([6823fe47](https://github.com/badbatch/repodog/commit/6823fe474b0a0be14f050fdda315ef34ea4a6508))

## 0.3.16 (2019-09-13)

### Bug Fixes

* **new-repo/monorepo:**  install nvm back in ([04acceae](https://github.com/badbatch/repodog/commit/04acceae68dc7cdcf88496f4c5d873429463dbd9))

## 0.3.15 (2019-09-13)

### Bug Fixes

* **new-repo/monorepo:**  split out installation steps ([e7a7a727](https://github.com/badbatch/repodog/commit/e7a7a7279e91a2aad373f2a8a9d8f6338ccc1812))

## 0.3.14 (2019-09-13)

### Bug Fixes

* **new-repo:**  remove workspace args from install commands ([e8cb945c](https://github.com/badbatch/repodog/commit/e8cb945cd258d2d7868e20abf7b485b421fa7e2b))
* **types:**  update utils types ([84b29591](https://github.com/badbatch/repodog/commit/84b2959190c744fba7253a41d325db856d4a9016))

## 0.3.13 (2019-09-13)

### Bug Fixes

* **types:**  update name of type ([277ef50c](https://github.com/badbatch/repodog/commit/277ef50c4c5936df674c0ac37d7e673919542814))

## 0.3.12 (2019-09-12)

## 0.3.11 (2019-09-12)

### Bug Fixes

* **helpers:**  remove node version and nvm install ([6f1ee6b9](https://github.com/badbatch/repodog/commit/6f1ee6b90191225b75671dbd7e24f97ea055c85e))

## 0.3.10 (2019-09-12)

## 0.3.9 (2019-09-12)

### Bug Fixes

* **helpers:**  nvm install still broken ([75a5e367](https://github.com/badbatch/repodog/commit/75a5e367b05efa22d09ce00c6fe70a315b6baa98))

## 0.3.8 (2019-09-12)

### Bug Fixes

* **helpers:**  nvm install was broken ([fd5097f2](https://github.com/badbatch/repodog/commit/fd5097f2752a48f70793a7e9f77d363565cf90a4))

## 0.3.7 (2019-09-10)

### Bug Fixes

* **new-repo/monorepo:**  load nvm into terminal session ([d24cf064](https://github.com/badbatch/repodog/commit/d24cf06466bf6719624a891b2a0ba4e606d1ea4e))

## 0.3.6 (2019-09-09)

### Bug Fixes

* **helpers:**  fix nvm install and use ([45ce6cf4](https://github.com/badbatch/repodog/commit/45ce6cf4396ea4629dd3a9589c3d49215a61d829))

## 0.3.5 (2019-09-09)

### Bug Fixes

* **helpers:**  fix bug in copy files ([461d3d12](https://github.com/badbatch/repodog/commit/461d3d126f7e02f3a8acc590414887da876e85ff))

## 0.3.4 (2019-09-09)

### New Features

* **new-repo,new-monorepo:**  add install nvm step ([3dbcab48](https://github.com/badbatch/repodog/commit/3dbcab48d140337b517c0e8b02efcd66fc6c3ecb))

## 0.3.3 (2019-09-09)

### Bug Fixes

* **new-repo:**  un-ignore private files ([e5b373ef](https://github.com/badbatch/repodog/commit/e5b373ef554e73550343417bf1807825bf9acaba))

## 0.3.2 (2019-09-09)

### Bug Fixes

* **helpers:**  add missing dependency ([db0e30f5](https://github.com/badbatch/repodog/commit/db0e30f5eb10fa699afc8174252a25204dd16c87))

## 0.3.1 (2019-09-09)

### Documentation Changes

* **new-monorepo, new-repo:**  update READMEs ([208aa7b5](https://github.com/badbatch/repodog/commit/208aa7b5dea5bfb5e3d12a7d89de7bbd4a48f6f0))

### Bug Fixes

* **helpers:**  add missing dependencies ([55e0da84](https://github.com/badbatch/repodog/commit/55e0da8446320fae36aa7b377e86e11da892ad26))
* **readme:**  correct description ([34ea6b0d](https://github.com/badbatch/repodog/commit/34ea6b0d56788350aa45c0eeb4e40c9b15872385))

### 0.3.0 (2019-09-08)

### Documentation Changes

* **readme:**  add new-repo link ([138221ed](https://github.com/badbatch/repodog/commit/138221edd52b3fddd673554ea1b03b66028522d0))

### New Features

* **new-repo:**  create new cmd to bootstrap single package repo ([5a4d07c6](https://github.com/badbatch/repodog/commit/5a4d07c69caf53b76504cc7b056fc4786d727c9d))

### Bug Fixes

* **new-repo:**  include npmignore file in scaffold ([db692d70](https://github.com/badbatch/repodog/commit/db692d7026a28f87ab9f1484fb1f27a1a9d2e8fe))

## 0.2.34 (2019-09-06)

### New Features

* **tslint:**  add no any rule ([b71d8b3a](https://github.com/badbatch/repodog/commit/b71d8b3a6d43e4f73092b91ffe24a6b493790141))
* **new-monorepo:**  add ts-jest and move all ts packages to config ([4e178b67](https://github.com/badbatch/repodog/commit/4e178b67dc21d581c07a3a2162bf6378cf69294d))
* **repo:**  add watch mode for ts packages ([0a678e8e](https://github.com/badbatch/repodog/commit/0a678e8ec6c12f3a511243e3aeafdc816133703d))

### Refactors

* **packages:**  update file structure ([432037e9](https://github.com/badbatch/repodog/commit/432037e996850b7cee76fa1e197e771739b32397))

## 0.2.33 (2019-09-03)

### New Features

* **new-monorepo:**  adding pause to check repo before install ([f7ac3866](https://github.com/badbatch/repodog/commit/f7ac3866982611a415075ccbe7757411646447c5))

### Bug Fixes

* **codecov:**  adding to installation configuration ([643f955b](https://github.com/badbatch/repodog/commit/643f955b06431d97fb820aede47b2cdc88992fe8))

## 0.2.32 (2019-09-02)

### Bug Fixes

* **new-monorepo:**  exception due to undefined variable ([5d63eb44](https://github.com/badbatch/repodog/commit/5d63eb4431834524e8741eaa133d14fdb7547d4d))

## 0.2.31 (2019-09-02)

### Bug Fixes

* **scripts:**  change way watch is called ([a84ad77b](https://github.com/badbatch/repodog/commit/a84ad77b8c1d071896576148ffe57c83b877825e))

### Refactors

* **new-monorepo:**  move to q&a style installation ([#2](https://github.com/badbatch/repodog/pull/2)) ([a30f8b08](https://github.com/badbatch/repodog/commit/a30f8b0811207adade6b3ed9dc61c0a6dc3adbb6))

## 0.2.30 (2019-08-30)

### Bug Fixes

* **new-monorepo:**  scaffold package json path wrong ([028fda76](https://github.com/badbatch/repodog/commit/028fda76d9bc1e341ccce05144883850b2a5b258))

## 0.2.29 (2019-08-30)

### Bug Fixes

* **new-monorepo:**  remove carriage returns from file lines ([54d5ea26](https://github.com/badbatch/repodog/commit/54d5ea26e97b9fb60bbe7654daa43948ee15ac6b))

## 0.2.28 (2019-08-30)

### New Features

* **tslint:**  add member sort rule to config ([03426f8e](https://github.com/badbatch/repodog/commit/03426f8ed717f20b8252cada8c0a452c0411fdff))

## 0.2.27 (2019-08-28)

### Bug Fixes

* **file loading:**  change back to require ([5d53de0f](https://github.com/badbatch/repodog/commit/5d53de0f5759bf0252f347c93548351d813804c6))

## 0.2.26 (2019-08-28)

## 0.2.25 (2019-08-28)

### Chores

* **security:**  upgrade eslint packages ([e1b2c290](https://github.com/badbatch/repodog/commit/e1b2c290f3f7d39ffe738037883afb1caba5bc2f))

### Bug Fixes

* **dependencies:**  moving internal dependencies to peer ([cc6dd9ba](https://github.com/badbatch/repodog/commit/cc6dd9bad5cd265409784d8f0157cd7b7470a4ef))

## 0.2.24 (2019-08-26)

### Bug Fixes

* **linting:**  resolve type errors ([8eb64eb1](https://github.com/badbatch/repodog/commit/8eb64eb1163149b325a8d44bbc957c818a43e83b))

## 0.2.23 (2019-08-25)

### Bug Fixes

* **file loading:**  remove require in place of readFileSync ([1cf4524f](https://github.com/badbatch/repodog/commit/1cf4524f7d442dbb678e474612566c35bc9f152a))

## 0.2.22 (2019-08-24)

### Bug Fixes

* **commands:**  add error catching ([89333412](https://github.com/badbatch/repodog/commit/893334127b39bca8af7d8e3b4a8cbace10b97c7a))

## 0.2.21 (2019-08-24)

### Bug Fixes

* **npmignore:**  update all packages to include src in package ([c6c65c94](https://github.com/badbatch/repodog/commit/c6c65c949f584cb722817cda3439687252016e10))

## 0.2.20 (2019-08-23)

### Bug Fixes

* **new-monorepo:**  update npmignore ([ba625eb5](https://github.com/badbatch/repodog/commit/ba625eb5c58d2bde1ef18f7973b6993b1a72fcac))

## 0.2.19 (2019-08-23)

### Bug Fixes

* **new-monorepo:**  update npmignore ([18e6fe33](https://github.com/badbatch/repodog/commit/18e6fe3363daeaea5c96d69d0d5f4da8936b0369))

## 0.2.18 (2019-08-23)

### Bug Fixes

* **new-monorepo:**  update npmignore files ([8aa99879](https://github.com/badbatch/repodog/commit/8aa998794dd6310ff732ab4e45ac0ca7e5e7ed2c))

## 0.2.17 (2019-08-23)

### Bug Fixes

* **new-monorepo, build-references:**  minor bugs ([65d32dde](https://github.com/badbatch/repodog/commit/65d32ddeb5af6b701930a649fb5e4a636cc61366))
* **new-monorepo:**  revert command back to init ([dea2af0d](https://github.com/badbatch/repodog/commit/dea2af0d07d7c3780792b9ae9c311fde97c85ecf))

## 0.2.16 (2019-08-23)

### Bug Fixes

* **new-monorepo:**  various bugs in scaffold copy operation ([5770af1e](https://github.com/badbatch/repodog/commit/5770af1ee7f45adc6fad1d052a9c80f0d000f42f))

## 0.2.15 (2019-08-23)

### Bug Fixes

* **new-monorepo:**  resolve errors in copying scaffold ([91ec68b4](https://github.com/badbatch/repodog/commit/91ec68b42a893d9c48133125457645bd8126c7ee))

## 0.2.14 (2019-08-21)

### New Features

* **eslint:**  add new rules to config ([b44d719c](https://github.com/badbatch/repodog/commit/b44d719c8bf426b95a0bde800ab90b54ab065f9c))

## 0.2.13 (2019-08-20)

### Bug Fixes

* **rollup, babel:**  resolve minor bugs ([0a1bd96a](https://github.com/badbatch/repodog/commit/0a1bd96ae8161e5161f61bf22f937f5840e6f40d))

## 0.2.12 (2019-08-20)

### Bug Fixes

* **rollup-config,ts-config:**  minor bug fixes ([4a1e1b5f](https://github.com/badbatch/repodog/commit/4a1e1b5faad0a299dabe205942293ebd985676b3))

## 0.2.11 (2019-08-19)

### Bug Fixes

* **new-monorepo:**  change merge order for root package json ([e26cf876](https://github.com/badbatch/repodog/commit/e26cf876e525cba74a894220f56cc7c9933c7c14))
* **rollup-config:**  change root package json import path ([1bfd2b2a](https://github.com/badbatch/repodog/commit/1bfd2b2a443b20f4ee5667e97b0be9de3cb2ac03))

## 0.2.10 (2019-08-16)

### Bug Fixes

* **rollup-config:**
  * removing types from js file ([e17624c9](https://github.com/badbatch/repodog/commit/e17624c991a7a881f7fe2d29dda0c19190b24a2f))
  * return object rather than array ([b7c3ad9e](https://github.com/badbatch/repodog/commit/b7c3ad9e401f4ea1c9b1396bb5943f3eaac51e59))

## 0.2.9 (2019-08-16)

### Bug Fixes

* **eslint,lerna:**  update eslint version and add to lerna config ([28b997e6](https://github.com/badbatch/repodog/commit/28b997e664a25acad0a15ccf1593d48caa709e72))

## 0.2.8 (2019-08-16)

### Bug Fixes

* **eslint-config:**  update rules ([0c392870](https://github.com/badbatch/repodog/commit/0c39287086248c9f4babb3f5a1e5c89a9cd5abd8))

## 0.2.7 (2019-08-16)

### New Features

* **babel-config:**  add react preset ([ce4f9d96](https://github.com/badbatch/repodog/commit/ce4f9d96a1da0fd7c45eb4bbf8e99eea027f856e))

### Bug Fixes

* **eslint-config:**  remove unnecessary rule reset ([7f4d3718](https://github.com/badbatch/repodog/commit/7f4d371888a0f95560764fa04c80466e44a932f6))

## 0.2.6 (2019-08-15)

### Bug Fixes

* **linting:**  update linting of various packages ([628ce483](https://github.com/badbatch/repodog/commit/628ce483ea0adcdf8a510769dbfbb8e88a328f62))
* **new-monorepo:**  fix typo in dependency name ([d42aba65](https://github.com/badbatch/repodog/commit/d42aba65f0602bdeff123276a3e0e34b36c9c3f5))
* **stylelint-config:**  add missing dependency ([446038cf](https://github.com/badbatch/repodog/commit/446038cf1dfb108f4683e13adb7961f9e157d903))

### Refactors

* **helpers:**  create iterateDirectory helper and update types ([ebb38791](https://github.com/badbatch/repodog/commit/ebb387916bf2d69b252eeaa04a9dc9c471d0e8bf))

## 0.2.5 (2019-08-15)

### New Features

* **new-monorepo:**  add overwrite flag for scaffold files ([fe27fae5](https://github.com/badbatch/repodog/commit/fe27fae5be3610e5db2a415b732817453446c39e))

## 0.2.4 (2019-08-15)

### Bug Fixes

* **new-monorepo:**  wrong path to write merged package.json ([3c80ee94](https://github.com/badbatch/repodog/commit/3c80ee942198ca7b814fad47edfcaf569259a5b4))

## 0.2.3 (2019-08-15)

### Bug Fixes

* **new-monorepo:**  correct scaffold path constant ([f42d606c](https://github.com/badbatch/repodog/commit/f42d606ce47bd7a20ea9b2885db53cbb77b367b5))

## 0.2.2 (2019-08-15)

### Documentation Changes

* **readme:**  add stylelint config link ([f1b22923](https://github.com/badbatch/repodog/commit/f1b229237db1e5d0a86c6206fc8fadb3e81091cd))

### Bug Fixes

* **new-monorepo:**  add missing import for constant ([02843716](https://github.com/badbatch/repodog/commit/028437164fa395ec014fdc286aed2f1ea85f8d4e))

## 0.2.1 (2019-08-15)

### Bug Fixes

* **eslint:**  changing config file to js ([8c5ce17e](https://github.com/badbatch/repodog/commit/8c5ce17e7515e102f200af42cb8c7432f3b1f88e))

### 0.2.0 (2019-08-15)

### New Features

* **stylelint:**  adding stylelint config module ([74a341e4](https://github.com/badbatch/repodog/commit/74a341e4bf80c74b12917264a108da269cbbd53b))

## 0.1.1 (2019-08-15)

### Documentation Changes

* **badges:**  adding license and npm badges to each package ([8a4b5463](https://github.com/badbatch/repodog/commit/8a4b5463eafb96c78e1937ac0eb5f1db7bbc5e30))

### New Features

* **new-monorepo:**  add ability to exclude scaffold files from copy ([0e46d89a](https://github.com/badbatch/repodog/commit/0e46d89a328fee4d6f8c65211c8ea52a3d7d0251))

### 0.1.0 (2019-08-14)

### Breaking Changes

* **repository:**  move to monorepo structure. ([#1](https://github.com/badbatch/repodog/pull/1)) ([db229878](https://github.com/badbatch/repodog/commit/db2298781d6c194a4b166f084fd0b1773305050b))

### Bug Fixes

* **cutoff:**  add package to repo and scaffold package.json ([4c1f6452](https://github.com/badbatch/repodog/commit/4c1f64527a0938373c6a67b5e2d39e86a53c9eea))

## 0.0.3 (2018-07-15)

### Bug Fixes

* **new-package:**  Removing unnecessary args and changing config dir structure. ([62f168e4](https://github.com/badbatch/repodog/commit/62f168e444aee7a3deb8ec397e7e3e85a7451ff4))

## 0.0.2 (2018-07-15)

### New Features

* **new-package:**  Create the new package script. ([2f4a39e7](https://github.com/badbatch/repodog/commit/2f4a39e7e7f6874123ca3e7609ff63d4a498933e))
