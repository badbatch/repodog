#### 1.0.15-alpha.0 (2023-05-08)

##### New Features

*  add check for node version at start of cli (d4c2faf8)
*  enable jest eslint rules and fix issues (3145df7e)
*  add syncpack config (67585fa7)

##### Bug Fixes

*  change way type paths are handled to fix hygen limitation (a3832fa0)
*  remove full stop in desc (bda0a333)
*  change to os separator (4e84a386)
*  remove org reference from repo template (338d660e)
*  add engine node to cli package json, add quotes to sh commands (eb626ac7)

##### Refactors

*  move templates and questions out of new folder (1a3b1d30)
*  add auto install peers and repodog installs (14239a82)

#### 1.0.14-alpha.0 (2023-04-26)

##### Bug Fixes

*  add back in json import type assert (9b7d4114)

#### 1.0.13-alpha.0 (2023-04-26)

##### Bug Fixes

*  custom type path should not default to empty string (dc9c4ce9)

#### 1.0.12-alpha.0 (2023-04-26)

##### Bug Fixes

*  remove empty string answers (2d71fae8)

#### 1.0.11-alpha.0 (2023-04-26)

##### Bug Fixes

*  create and cd into new lib if not in correct folder (d6ce7557)

#### 1.0.10-alpha.0 (2023-04-26)

##### New Features

*  add setup command (47597746)

##### Bug Fixes

*  add peers as deps, kebabcase arg (0d81e522)

#### 1.0.9-alpha.0 (2023-04-13)

##### Bug Fixes

*  warnings (28c69d4d)
*  subtype bug and add library questions (7e9826f1)

##### Refactors

*  change way mocks are structured (9e649b4c)
*  move to .ts extensions with ts 5 (6762dd0e)
*  upgrade typescript and add repo/lib templates (a9e378b9)

#### 1.0.8-alpha.0 (2023-03-31)

##### Documentation Changes

*  add divider back in (86e9bb4b)
*  remove dividers (eaaa21a7)
*  minor wording change on readme (bfdca08a)

##### New Features

*  add validation of subtype in new script (a8276d5a)

##### Bug Fixes

*  move log messages (b03b01ea)
*  versioning packages with versioned internal deps (28645924)

##### Refactors

*  get language and pass to template engine (c8b36822)
*  add subtype for new repo command support (6cf2c651)
*  update to write cmd arg casing (55194273)

#### 1.0.8-alpha.0 (2023-03-20)

##### New Features

*  add write command (ee7605c2)
*  new package script (402627b7)

##### Refactors

*  update shared files and utils to support write package (a97c7e79)
*  remove babel lodash plugin (555160a5)
*  make use of enums (9a876b38)

#### 1.0.7-alpha.0 (2023-02-23)

##### Bug Fixes

*  typo in action workflow script (69d62563)

#### 1.0.6-alpha.0 (2023-02-23)

##### Bug Fixes

*  change way npm auth token is injected in pipeline (da575152)

#### 1.0.5-alpha.0 (2023-02-22)

##### Bug Fixes

*  make sure chdir is passed absolute path (88d504a0)

#### 1.0.4-alpha.0 (2023-02-21)

##### Bug Fixes

*  adding change directory into publish package flow (cb1b692f)

#### 1.0.3-alpha.0 (2023-02-21)

##### Refactors

*  add verbose logging to publish command (4560bb8d)

#### 1.0.2-alpha.0 (2023-02-21)

##### Bug Fixes

*  update how publish script is called in pipeline (d0e8f136)

#### 1.0.1-alpha.0 (2023-02-21)

##### Bug Fixes

*  update package manager version in action (b6d780f7)

#### 1.0.0-alpha.0 (2023-02-21)

##### New Features

*  move cutoff into repodog (8b4e53fb)
*  add github workflows (d77fc9dd)
*  add ability to cut dry run (0242505d)
*  add duration log at end of cut handler (b01988da)

##### Refactors

*  remove all but config packages (42a1c280)
*  move configs into own folder (a58acbed)
*  update readmes (060a7d11)
*  change npm script changelog is linked to (9fbf040a)
*  allow any release type to generate changelog (ca891a0b)

#### 0.3.53 (2020-03-03)

##### Chores

*  update cutoff ([22f6b928](https://github.com/badbatch/repodog/commit/22f6b928f8230086216d096c24dec38769435dba))
*  update urls after moving repo ([82a3cd30](https://github.com/badbatch/repodog/commit/82a3cd30027c4e4924569a51b28c8656f7c15dd1))

##### Bug Fixes

* **jest:**  change name of test folder ([c1a0efa1](https://github.com/badbatch/repodog/commit/c1a0efa14edd1860defa44dac5f0e9567197a295))

#### 0.3.52 (2020-03-03)

##### Bug Fixes

* **new-repo:**  remove boostrap cmd from package json ([30d5d3f9](https://github.com/dylanaubrey/repodog/commit/30d5d3f9411f28d9a99db76e49440ced4d4ab37a))
*  add codecov cmd to new repo/monorepo travis files ([f2645bda](https://github.com/dylanaubrey/repodog/commit/f2645bda30a6437a7d973d79c86572aed1b16a4d))

#### 0.3.51 (2020-03-03)

##### Bug Fixes

* **new-repo:**  adding exists check on dir before make ([9e128870](https://github.com/dylanaubrey/repodog/commit/9e12887053c2117cf8a656ea938117a74cbf9bc0))

#### 0.3.50 (2020-03-02)

##### Chores

*  upgrade dependencies ([ee1cd2bc](https://github.com/dylanaubrey/repodog/commit/ee1cd2bce5c59f52a235b2fe6fd0fa0110167ac2))

#### 0.3.49 (2020-03-02)

##### Bug Fixes

*  change missed peer dependency version ([dda5c3cb](https://github.com/dylanaubrey/repodog/commit/dda5c3cb56517a713912655cb0798811c235525d))
*  peer dependency versioning ([47c874a7](https://github.com/dylanaubrey/repodog/commit/47c874a792e2a7f178676bc2a0d248f4babc0c4b))

#### 0.3.48 (2020-02-19)

##### Bug Fixes

*  add new tslint rule and exclude lib from jest ([aaed031b](https://github.com/dylanaubrey/repodog/commit/aaed031b4311087b7cd8fc6bd033ed7a07a907cb))

#### 0.3.47 (2020-01-21)

##### New Features

* **rollup-config:**  upgrade babel plugin to use skip checks ([b470475e](https://github.com/dylanaubrey/repodog/commit/b470475e31f65fdfc11c156f50b32aef9b0806aa))

##### Bug Fixes

*  add new rollup config to repo ([f13aaac8](https://github.com/dylanaubrey/repodog/commit/f13aaac8c5362529af63915a1afd4e7809343d47))

#### 0.3.46 (2020-01-21)

##### New Features

* **rollup-config:**  upgrade babel plugin to use skip checks ([b470475e](https://github.com/dylanaubrey/repodog/commit/b470475e31f65fdfc11c156f50b32aef9b0806aa))

#### 0.3.45 (2020-01-21)

##### Bug Fixes

* **babel-config:**  remove unnecessary cache config ([e3b43dc6](https://github.com/dylanaubrey/repodog/commit/e3b43dc63fe2246f9d885073b43c09ca4d652d08))

#### 0.3.44 (2020-01-21)

##### New Features

* **babel-config:**  restrict caching to when babel env is same ([55b10bdd](https://github.com/dylanaubrey/repodog/commit/55b10bdd504fb583741506a069882984a9ad0b39))

#### 0.3.43 (2019-12-31)

##### Chores

* **deps:**  bump handlebars from 4.1.2 to 4.5.3 ([#3](https://github.com/dylanaubrey/repodog/pull/3)) ([0d5183df](https://github.com/dylanaubrey/repodog/commit/0d5183df2e97f7612b92c36156d45843b30f44f1))

##### Bug Fixes

*  add enzyme to jest install if react feature is there ([25debfd6](https://github.com/dylanaubrey/repodog/commit/25debfd6e271ebf899fb092bfe4d178d4786b3c4))

#### 0.3.42 (2019-12-23)

##### Bug Fixes

*  update ignore patterns again ([185b628e](https://github.com/dylanaubrey/repodog/commit/185b628ee84d4094e57e05f4611e8192e2456f31))

#### 0.3.41 (2019-12-20)

##### Bug Fixes

*  updating folders in various ignore files ([757359b2](https://github.com/dylanaubrey/repodog/commit/757359b2a83e08c3c2ab7a06b77ed14bebf1cb44))

#### 0.3.40 (2019-12-20)

##### Bug Fixes

*  add test and mock folders to various configs ([f867c1b9](https://github.com/dylanaubrey/repodog/commit/f867c1b9411bc6776b663336488b508f9e57ac67))

#### 0.3.39 (2019-12-02)

##### Bug Fixes

* **stylelint-config:**  add support for new babel plugins ([3c8817cb](https://github.com/dylanaubrey/repodog/commit/3c8817cb12733d684cf3a30b2bd782ac50474ca8))
*  add js and ts lints into linting npm script ([cabac679](https://github.com/dylanaubrey/repodog/commit/cabac679e17b66484cd90739fe0171e4a8475102))
* **eslint-config:**  correctly split airbnb base and react rulesets ([1b744c51](https://github.com/dylanaubrey/repodog/commit/1b744c51630f00d90df1bb2f198f11be7ead722f))

#### 0.3.38 (2019-11-12)

##### Chores

*  update dependencies and fix issues ([ca58d25a](https://github.com/dylanaubrey/repodog/commit/ca58d25a8ceb7a351c496846330686ec21e0f37c))

#### 0.3.37 (2019-11-05)

##### Bug Fixes

* **babel-config:**  update to deal with browser test env ([b5cedbce](https://github.com/dylanaubrey/repodog/commit/b5cedbce405e10a8bac90b5948432e3939274440))

#### 0.3.36 (2019-11-04)

##### Documentation Changes

*  add missing packages to main readme ([01d9506b](https://github.com/dylanaubrey/repodog/commit/01d9506b72cd4353fb63a51b21add5edaac3edcc))
*  update new repo/monorepo readme files ([a5e74136](https://github.com/dylanaubrey/repodog/commit/a5e74136454b90190043af6af9cbef14de5eefd1))

##### Bug Fixes

* **rollup-config:**  path to babel config broken for single repo ([9f143aeb](https://github.com/dylanaubrey/repodog/commit/9f143aeb356939ba9f781dfade206c278818af16))
*  update new repo/monorepo repo feature types ([af6eb1c7](https://github.com/dylanaubrey/repodog/commit/af6eb1c74a06674aa5b46a6dfff6c6b54a79fd62))

#### 0.3.35 (2019-10-31)

##### Bug Fixes

* **new-monorepo:**
  *  remove unused variables ([b246e2dc](https://github.com/dylanaubrey/repodog/commit/b246e2dc0f38bbc9fac641a3a68e13fab827b60b))
  *  add lerna version and remove build references ([b6931919](https://github.com/dylanaubrey/repodog/commit/b6931919682a7df88d0f99afd0b53901634307c2))

#### 0.3.34 (2019-10-28)

##### New Features

*  add npm packages to install logic ([b814e0d5](https://github.com/dylanaubrey/repodog/commit/b814e0d5dfc0fd03a670da45ec1aa037c3c449f1))

#### 0.3.33 (2019-10-24)

##### Bug Fixes

*  wrong dependency version ([2d335bb5](https://github.com/dylanaubrey/repodog/commit/2d335bb50792165b0d379a8680cde2cab702311b))

#### 0.3.32 (2019-10-24)

##### Bug Fixes

*  add config helpers to initial package dev dependencies ([58357496](https://github.com/dylanaubrey/repodog/commit/583574966fb29acd56a67902a477da410c43e8c8))

#### 0.3.31 (2019-10-23)

##### New Features

* **new-repo:**  add logging to get package dependencies ([f25a8dba](https://github.com/dylanaubrey/repodog/commit/f25a8dba044d017a28a37e390a115b2dd07e5e0b))

##### Bug Fixes

* **constants:**  type error ([6eb6b4de](https://github.com/dylanaubrey/repodog/commit/6eb6b4decbc95ff7e08f0771d0697d7b161552a6))
*  add missing tsconfig to files list ([2be17510](https://github.com/dylanaubrey/repodog/commit/2be1751029f48142c910ed23bae810cfe941b05d))

#### 0.3.30 (2019-10-23)

##### Bug Fixes

*  update npmignore ([45c36a2a](https://github.com/dylanaubrey/repodog/commit/45c36a2aefb807a78f81d4781eb0a32764122a08))
*  change engine node version ([59f4fe21](https://github.com/dylanaubrey/repodog/commit/59f4fe2111ba7b83547bbdc069b262f6ad57596a))
*  revert node engine change ([1934cd2e](https://github.com/dylanaubrey/repodog/commit/1934cd2e45dbae01fb39a4389c85661d2e7831b5))

#### 0.3.29 (2019-10-23)

##### Bug Fixes

*  change repodog config to json file ([4256e187](https://github.com/dylanaubrey/repodog/commit/4256e1874dce8258f8eaed63c798564fd9ccc170))
*  change npmignore to be dynamically added ([6bb9010d](https://github.com/dylanaubrey/repodog/commit/6bb9010d63bfb096e64d27eebfd236a214f31802))
*  update repodog config ([fc32b77e](https://github.com/dylanaubrey/repodog/commit/fc32b77ed2acd9ff56cf41ef4b27d53d1ed6d69e))

#### 0.3.28 (2019-10-22)

##### Chores

*  upgrade node version and dependencies ([17bf5832](https://github.com/dylanaubrey/repodog/commit/17bf5832d5894a3698aed1b99fbd32973332bde7))
*  upgrade dependencies and introduce optional chaining ([10edd889](https://github.com/dylanaubrey/repodog/commit/10edd8898a8f6bbcf4635681553297a15c987b71))

##### New Features

*  enable dependantOn within dependencies configs ([02a4e9c3](https://github.com/dylanaubrey/repodog/commit/02a4e9c3d658b8c80007047e11f0521dae6f8469))
*  adding dynamic dependencies to tslint config ([866b3e1c](https://github.com/dylanaubrey/repodog/commit/866b3e1cad54110643584287ae8926ee7f4a2f6c))
*  add dynamic dependencies to stylelint config ([b91e8d2e](https://github.com/dylanaubrey/repodog/commit/b91e8d2e483413a2610986e3c47257f0948a9ba9))
*  update rollup config to fix bugs and add dependencies ([25eee86b](https://github.com/dylanaubrey/repodog/commit/25eee86bf48abc6ee77531cecb6c5190879377db))
*  add writing of features to repo config ([377f23ad](https://github.com/dylanaubrey/repodog/commit/377f23ad465709f44331f4ed4dd80ea3b6d1e71d))
* **babel-config:**  only load plugins that match features ([98755eb3](https://github.com/dylanaubrey/repodog/commit/98755eb3f7aa42c95dd01ecf7af4e2f18fd4558f))

##### Bug Fixes

*  split included packages between single and multo package ([f9c4eeb3](https://github.com/dylanaubrey/repodog/commit/f9c4eeb3cc1dc068c0c182e5603f14edd42cd229))

##### Refactors

*  update babel, eslint, jest to support dynamic ([70077984](https://github.com/dylanaubrey/repodog/commit/70077984acf9a19bb9f79a33959e786115d88309))

#### 0.3.27 (2019-09-25)

##### Bug Fixes

* **new-repo:**  update npmignore ([37ffcf50](https://github.com/dylanaubrey/repodog/commit/37ffcf50c15aed98f95bc386efc38dc8df1657d4))

#### 0.3.26 (2019-09-25)

##### Bug Fixes

* **new-repo:**  add main fields to scaffold package.json ([67df9f97](https://github.com/dylanaubrey/repodog/commit/67df9f9747ee33453c80d2804569b7bbb3463494))

#### 0.3.25 (2019-09-19)

##### Bug Fixes

* **jest:**  add default test ignore pattern ([29cffa98](https://github.com/dylanaubrey/repodog/commit/29cffa9874b33e0e66dee34fd9393944f8fe08c7))

#### 0.3.24 (2019-09-18)

##### Bug Fixes

* **types:**  replace Val with any in utils ([e9872ed8](https://github.com/dylanaubrey/repodog/commit/e9872ed856575a909d0417efb8befac378ce25b6))

#### 0.3.23 (2019-09-16)

#### 0.3.22 (2019-09-16)

##### Bug Fixes

* **ts-config:**  add module field into base config ([4f96309e](https://github.com/dylanaubrey/repodog/commit/4f96309e591f3be25e70ac1f990188cc2f14d2d2))

#### 0.3.21 (2019-09-15)

##### Bug Fixes

* **jest, tsconfig:**  update configs to resolve install bugs ([e16463f0](https://github.com/dylanaubrey/repodog/commit/e16463f0035cc2c9b0f7453ceb056dee5b81eb41))

#### 0.3.20 (2019-09-13)

##### Bug Fixes

* **lint:**  sort errors ([4bec627a](https://github.com/dylanaubrey/repodog/commit/4bec627a32208930fc647c79b1bb23d6461ed8be))

#### 0.3.19 (2019-09-13)

##### Bug Fixes

* **new-repo/monorepo:**  remove version from peer dependencies ([1397525e](https://github.com/dylanaubrey/repodog/commit/1397525ef4fdd06eb845f8f3bf5c7a427153e98b))

#### 0.3.18 (2019-09-13)

##### Bug Fixes

* **new-repo/monorepo:**  add version into peer dependency install ([9a4e398c](https://github.com/dylanaubrey/repodog/commit/9a4e398c3fce4e38018d1551652cca05971532cf))

#### 0.3.17 (2019-09-13)

##### Bug Fixes

* **new-repo/monorepo:**  add load nvm to scripts ([6823fe47](https://github.com/dylanaubrey/repodog/commit/6823fe474b0a0be14f050fdda315ef34ea4a6508))

#### 0.3.16 (2019-09-13)

##### Bug Fixes

* **new-repo/monorepo:**  install nvm back in ([04acceae](https://github.com/dylanaubrey/repodog/commit/04acceae68dc7cdcf88496f4c5d873429463dbd9))

#### 0.3.15 (2019-09-13)

##### Bug Fixes

* **new-repo/monorepo:**  split out installation steps ([e7a7a727](https://github.com/dylanaubrey/repodog/commit/e7a7a7279e91a2aad373f2a8a9d8f6338ccc1812))

#### 0.3.14 (2019-09-13)

##### Bug Fixes

* **new-repo:**  remove workspace args from install commands ([e8cb945c](https://github.com/dylanaubrey/repodog/commit/e8cb945cd258d2d7868e20abf7b485b421fa7e2b))
* **types:**  update utils types ([84b29591](https://github.com/dylanaubrey/repodog/commit/84b2959190c744fba7253a41d325db856d4a9016))

#### 0.3.13 (2019-09-13)

##### Bug Fixes

* **types:**  update name of type ([277ef50c](https://github.com/dylanaubrey/repodog/commit/277ef50c4c5936df674c0ac37d7e673919542814))

#### 0.3.12 (2019-09-12)

#### 0.3.11 (2019-09-12)

##### Bug Fixes

* **helpers:**  remove node version and nvm install ([6f1ee6b9](https://github.com/dylanaubrey/repodog/commit/6f1ee6b90191225b75671dbd7e24f97ea055c85e))

#### 0.3.10 (2019-09-12)

#### 0.3.9 (2019-09-12)

##### Bug Fixes

* **helpers:**  nvm install still broken ([75a5e367](https://github.com/dylanaubrey/repodog/commit/75a5e367b05efa22d09ce00c6fe70a315b6baa98))

#### 0.3.8 (2019-09-12)

##### Bug Fixes

* **helpers:**  nvm install was broken ([fd5097f2](https://github.com/dylanaubrey/repodog/commit/fd5097f2752a48f70793a7e9f77d363565cf90a4))

#### 0.3.7 (2019-09-10)

##### Bug Fixes

* **new-repo/monorepo:**  load nvm into terminal session ([d24cf064](https://github.com/dylanaubrey/repodog/commit/d24cf06466bf6719624a891b2a0ba4e606d1ea4e))

#### 0.3.6 (2019-09-09)

##### Bug Fixes

* **helpers:**  fix nvm install and use ([45ce6cf4](https://github.com/dylanaubrey/repodog/commit/45ce6cf4396ea4629dd3a9589c3d49215a61d829))

#### 0.3.5 (2019-09-09)

##### Bug Fixes

* **helpers:**  fix bug in copy files ([461d3d12](https://github.com/dylanaubrey/repodog/commit/461d3d126f7e02f3a8acc590414887da876e85ff))

#### 0.3.4 (2019-09-09)

##### New Features

* **new-repo,new-monorepo:**  add install nvm step ([3dbcab48](https://github.com/dylanaubrey/repodog/commit/3dbcab48d140337b517c0e8b02efcd66fc6c3ecb))

#### 0.3.3 (2019-09-09)

##### Bug Fixes

* **new-repo:**  un-ignore private files ([e5b373ef](https://github.com/dylanaubrey/repodog/commit/e5b373ef554e73550343417bf1807825bf9acaba))

#### 0.3.2 (2019-09-09)

##### Bug Fixes

* **helpers:**  add missing dependency ([db0e30f5](https://github.com/dylanaubrey/repodog/commit/db0e30f5eb10fa699afc8174252a25204dd16c87))

#### 0.3.1 (2019-09-09)

##### Documentation Changes

* **new-monorepo, new-repo:**  update READMEs ([208aa7b5](https://github.com/dylanaubrey/repodog/commit/208aa7b5dea5bfb5e3d12a7d89de7bbd4a48f6f0))

##### Bug Fixes

* **helpers:**  add missing dependencies ([55e0da84](https://github.com/dylanaubrey/repodog/commit/55e0da8446320fae36aa7b377e86e11da892ad26))
* **readme:**  correct description ([34ea6b0d](https://github.com/dylanaubrey/repodog/commit/34ea6b0d56788350aa45c0eeb4e40c9b15872385))

### 0.3.0 (2019-09-08)

##### Documentation Changes

* **readme:**  add new-repo link ([138221ed](https://github.com/dylanaubrey/repodog/commit/138221edd52b3fddd673554ea1b03b66028522d0))

##### New Features

* **new-repo:**  create new cmd to bootstrap single package repo ([5a4d07c6](https://github.com/dylanaubrey/repodog/commit/5a4d07c69caf53b76504cc7b056fc4786d727c9d))

##### Bug Fixes

* **new-repo:**  include npmignore file in scaffold ([db692d70](https://github.com/dylanaubrey/repodog/commit/db692d7026a28f87ab9f1484fb1f27a1a9d2e8fe))

#### 0.2.34 (2019-09-06)

##### New Features

* **tslint:**  add no any rule ([b71d8b3a](https://github.com/dylanaubrey/repodog/commit/b71d8b3a6d43e4f73092b91ffe24a6b493790141))
* **new-monorepo:**  add ts-jest and move all ts packages to config ([4e178b67](https://github.com/dylanaubrey/repodog/commit/4e178b67dc21d581c07a3a2162bf6378cf69294d))
* **repo:**  add watch mode for ts packages ([0a678e8e](https://github.com/dylanaubrey/repodog/commit/0a678e8ec6c12f3a511243e3aeafdc816133703d))

##### Refactors

* **packages:**  update file structure ([432037e9](https://github.com/dylanaubrey/repodog/commit/432037e996850b7cee76fa1e197e771739b32397))

#### 0.2.33 (2019-09-03)

##### New Features

* **new-monorepo:**  adding pause to check repo before install ([f7ac3866](https://github.com/dylanaubrey/repodog/commit/f7ac3866982611a415075ccbe7757411646447c5))

##### Bug Fixes

* **codecov:**  adding to installation configuration ([643f955b](https://github.com/dylanaubrey/repodog/commit/643f955b06431d97fb820aede47b2cdc88992fe8))

#### 0.2.32 (2019-09-02)

##### Bug Fixes

* **new-monorepo:**  exception due to undefined variable ([5d63eb44](https://github.com/dylanaubrey/repodog/commit/5d63eb4431834524e8741eaa133d14fdb7547d4d))

#### 0.2.31 (2019-09-02)

##### Bug Fixes

* **scripts:**  change way watch is called ([a84ad77b](https://github.com/dylanaubrey/repodog/commit/a84ad77b8c1d071896576148ffe57c83b877825e))

##### Refactors

* **new-monorepo:**  move to q&a style installation ([#2](https://github.com/dylanaubrey/repodog/pull/2)) ([a30f8b08](https://github.com/dylanaubrey/repodog/commit/a30f8b0811207adade6b3ed9dc61c0a6dc3adbb6))

#### 0.2.30 (2019-08-30)

##### Bug Fixes

* **new-monorepo:**  scaffold package json path wrong ([028fda76](https://github.com/dylanaubrey/repodog/commit/028fda76d9bc1e341ccce05144883850b2a5b258))

#### 0.2.29 (2019-08-30)

##### Bug Fixes

* **new-monorepo:**  remove carriage returns from file lines ([54d5ea26](https://github.com/dylanaubrey/repodog/commit/54d5ea26e97b9fb60bbe7654daa43948ee15ac6b))

#### 0.2.28 (2019-08-30)

##### New Features

* **tslint:**  add member sort rule to config ([03426f8e](https://github.com/dylanaubrey/repodog/commit/03426f8ed717f20b8252cada8c0a452c0411fdff))

#### 0.2.27 (2019-08-28)

##### Bug Fixes

* **file loading:**  change back to require ([5d53de0f](https://github.com/dylanaubrey/repodog/commit/5d53de0f5759bf0252f347c93548351d813804c6))

#### 0.2.26 (2019-08-28)

#### 0.2.25 (2019-08-28)

##### Chores

* **security:**  upgrade eslint packages ([e1b2c290](https://github.com/dylanaubrey/repodog/commit/e1b2c290f3f7d39ffe738037883afb1caba5bc2f))

##### Bug Fixes

* **dependencies:**  moving internal dependencies to peer ([cc6dd9ba](https://github.com/dylanaubrey/repodog/commit/cc6dd9bad5cd265409784d8f0157cd7b7470a4ef))

#### 0.2.24 (2019-08-26)

##### Bug Fixes

* **linting:**  resolve type errors ([8eb64eb1](https://github.com/dylanaubrey/repodog/commit/8eb64eb1163149b325a8d44bbc957c818a43e83b))

#### 0.2.23 (2019-08-25)

##### Bug Fixes

* **file loading:**  remove require in place of readFileSync ([1cf4524f](https://github.com/dylanaubrey/repodog/commit/1cf4524f7d442dbb678e474612566c35bc9f152a))

#### 0.2.22 (2019-08-24)

##### Bug Fixes

* **commands:**  add error catching ([89333412](https://github.com/dylanaubrey/repodog/commit/893334127b39bca8af7d8e3b4a8cbace10b97c7a))

#### 0.2.21 (2019-08-24)

##### Bug Fixes

* **npmignore:**  update all packages to include src in package ([c6c65c94](https://github.com/dylanaubrey/repodog/commit/c6c65c949f584cb722817cda3439687252016e10))

#### 0.2.20 (2019-08-23)

##### Bug Fixes

* **new-monorepo:**  update npmignore ([ba625eb5](https://github.com/dylanaubrey/repodog/commit/ba625eb5c58d2bde1ef18f7973b6993b1a72fcac))

#### 0.2.19 (2019-08-23)

##### Bug Fixes

* **new-monorepo:**  update npmignore ([18e6fe33](https://github.com/dylanaubrey/repodog/commit/18e6fe3363daeaea5c96d69d0d5f4da8936b0369))

#### 0.2.18 (2019-08-23)

##### Bug Fixes

* **new-monorepo:**  update npmignore files ([8aa99879](https://github.com/dylanaubrey/repodog/commit/8aa998794dd6310ff732ab4e45ac0ca7e5e7ed2c))

#### 0.2.17 (2019-08-23)

##### Bug Fixes

* **new-monorepo, build-references:**  minor bugs ([65d32dde](https://github.com/dylanaubrey/repodog/commit/65d32ddeb5af6b701930a649fb5e4a636cc61366))
* **new-monorepo:**  revert command back to init ([dea2af0d](https://github.com/dylanaubrey/repodog/commit/dea2af0d07d7c3780792b9ae9c311fde97c85ecf))

#### 0.2.16 (2019-08-23)

##### Bug Fixes

* **new-monorepo:**  various bugs in scaffold copy operation ([5770af1e](https://github.com/dylanaubrey/repodog/commit/5770af1ee7f45adc6fad1d052a9c80f0d000f42f))

#### 0.2.15 (2019-08-23)

##### Bug Fixes

* **new-monorepo:**  resolve errors in copying scaffold ([91ec68b4](https://github.com/dylanaubrey/repodog/commit/91ec68b42a893d9c48133125457645bd8126c7ee))

#### 0.2.14 (2019-08-21)

##### New Features

* **eslint:**  add new rules to config ([b44d719c](https://github.com/dylanaubrey/repodog/commit/b44d719c8bf426b95a0bde800ab90b54ab065f9c))

#### 0.2.13 (2019-08-20)

##### Bug Fixes

* **rollup, babel:**  resolve minor bugs ([0a1bd96a](https://github.com/dylanaubrey/repodog/commit/0a1bd96ae8161e5161f61bf22f937f5840e6f40d))

#### 0.2.12 (2019-08-20)

##### Bug Fixes

* **rollup-config,ts-config:**  minor bug fixes ([4a1e1b5f](https://github.com/dylanaubrey/repodog/commit/4a1e1b5faad0a299dabe205942293ebd985676b3))

#### 0.2.11 (2019-08-19)

##### Bug Fixes

* **new-monorepo:**  change merge order for root package json ([e26cf876](https://github.com/dylanaubrey/repodog/commit/e26cf876e525cba74a894220f56cc7c9933c7c14))
* **rollup-config:**  change root package json import path ([1bfd2b2a](https://github.com/dylanaubrey/repodog/commit/1bfd2b2a443b20f4ee5667e97b0be9de3cb2ac03))

#### 0.2.10 (2019-08-16)

##### Bug Fixes

* **rollup-config:**
  *  removing types from js file ([e17624c9](https://github.com/dylanaubrey/repodog/commit/e17624c991a7a881f7fe2d29dda0c19190b24a2f))
  *  return object rather than array ([b7c3ad9e](https://github.com/dylanaubrey/repodog/commit/b7c3ad9e401f4ea1c9b1396bb5943f3eaac51e59))

#### 0.2.9 (2019-08-16)

##### Bug Fixes

* **eslint,lerna:**  update eslint version and add to lerna config ([28b997e6](https://github.com/dylanaubrey/repodog/commit/28b997e664a25acad0a15ccf1593d48caa709e72))

#### 0.2.8 (2019-08-16)

##### Bug Fixes

* **eslint-config:**  update rules ([0c392870](https://github.com/dylanaubrey/repodog/commit/0c39287086248c9f4babb3f5a1e5c89a9cd5abd8))

#### 0.2.7 (2019-08-16)

##### New Features

* **babel-config:**  add react preset ([ce4f9d96](https://github.com/dylanaubrey/repodog/commit/ce4f9d96a1da0fd7c45eb4bbf8e99eea027f856e))

##### Bug Fixes

* **eslint-config:**  remove unnecessary rule reset ([7f4d3718](https://github.com/dylanaubrey/repodog/commit/7f4d371888a0f95560764fa04c80466e44a932f6))

#### 0.2.6 (2019-08-15)

##### Bug Fixes

* **linting:**  update linting of various packages ([628ce483](https://github.com/dylanaubrey/repodog/commit/628ce483ea0adcdf8a510769dbfbb8e88a328f62))
* **new-monorepo:**  fix typo in dependency name ([d42aba65](https://github.com/dylanaubrey/repodog/commit/d42aba65f0602bdeff123276a3e0e34b36c9c3f5))
* **stylelint-config:**  add missing dependency ([446038cf](https://github.com/dylanaubrey/repodog/commit/446038cf1dfb108f4683e13adb7961f9e157d903))

##### Refactors

* **helpers:**  create iterateDirectory helper and update types ([ebb38791](https://github.com/dylanaubrey/repodog/commit/ebb387916bf2d69b252eeaa04a9dc9c471d0e8bf))

#### 0.2.5 (2019-08-15)

##### New Features

* **new-monorepo:**  add overwrite flag for scaffold files ([fe27fae5](https://github.com/dylanaubrey/repodog/commit/fe27fae5be3610e5db2a415b732817453446c39e))

#### 0.2.4 (2019-08-15)

##### Bug Fixes

* **new-monorepo:**  wrong path to write merged package.json ([3c80ee94](https://github.com/dylanaubrey/repodog/commit/3c80ee942198ca7b814fad47edfcaf569259a5b4))

#### 0.2.3 (2019-08-15)

##### Bug Fixes

* **new-monorepo:**  correct scaffold path constant ([f42d606c](https://github.com/dylanaubrey/repodog/commit/f42d606ce47bd7a20ea9b2885db53cbb77b367b5))

#### 0.2.2 (2019-08-15)

##### Documentation Changes

* **readme:**  add stylelint config link ([f1b22923](https://github.com/dylanaubrey/repodog/commit/f1b229237db1e5d0a86c6206fc8fadb3e81091cd))

##### Bug Fixes

* **new-monorepo:**  add missing import for constant ([02843716](https://github.com/dylanaubrey/repodog/commit/028437164fa395ec014fdc286aed2f1ea85f8d4e))

#### 0.2.1 (2019-08-15)

##### Bug Fixes

* **eslint:**  changing config file to js ([8c5ce17e](https://github.com/dylanaubrey/repodog/commit/8c5ce17e7515e102f200af42cb8c7432f3b1f88e))

### 0.2.0 (2019-08-15)

##### New Features

* **stylelint:**  adding stylelint config module ([74a341e4](https://github.com/dylanaubrey/repodog/commit/74a341e4bf80c74b12917264a108da269cbbd53b))

#### 0.1.1 (2019-08-15)

##### Documentation Changes

* **badges:**  adding license and npm badges to each package ([8a4b5463](https://github.com/dylanaubrey/repodog/commit/8a4b5463eafb96c78e1937ac0eb5f1db7bbc5e30))

##### New Features

* **new-monorepo:**  add ability to exclude scaffold files from copy ([0e46d89a](https://github.com/dylanaubrey/repodog/commit/0e46d89a328fee4d6f8c65211c8ea52a3d7d0251))

### 0.1.0 (2019-08-14)

##### Breaking Changes

* **repository:**  move to monorepo structure. ([#1](https://github.com/dylanaubrey/repodog/pull/1)) ([db229878](https://github.com/dylanaubrey/repodog/commit/db2298781d6c194a4b166f084fd0b1773305050b))

##### Bug Fixes

* **cutoff:**  add package to repo and scaffold package.json ([4c1f6452](https://github.com/dylanaubrey/repodog/commit/4c1f64527a0938373c6a67b5e2d39e86a53c9eea))

#### 0.0.3 (2018-07-15)

##### Bug Fixes

* **new-package:**  Removing unnecessary args and changing config dir structure. ([62f168e4](https://github.com/dylanaubrey/repodog/commit/62f168e444aee7a3deb8ec397e7e3e85a7451ff4))

#### 0.0.2 (2018-07-15)

##### New Features

* **new-package:**  Create the new package script. ([2f4a39e7](https://github.com/dylanaubrey/repodog/commit/2f4a39e7e7f6874123ca3e7609ff63d4a498933e))

