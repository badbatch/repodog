# @repodog/storybook-config

The Repodog Storybook config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fstorybook-config.svg)](https://badge.fury.io/js/%40repodog%2Fstorybook-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package and peer dependency

```shell
# terminal
npm install @repodog/storybook-config storybook --save-dev
```

## Install optional peer dependencies

```shell
# terminal
npm install @chanzuckerberg/axe-storybook-testing @storybook/test-runner chromatic --save-dev
# with babel
npm install @repodog/babel-preset --save-dev
# or swc
npm install @repodog/swc-config --save-dev
```

## Use package

```jsonc
// package.json
{
  "scripts": {
    "build-storybook": "storybook build",
    // Requires optional peer chromatic
    "chromatic": "chromatic --project-token <CHROMATIC_TOKEN>",
    "storybook": "storybook dev -p <PORT>",
    // Requires optional peer @chanzuckerberg/axe-storybook-testing
    "test-axe": "npm run build-storybook && axe-storybook",
    // Requires optional peer @storybook/test-runner and `concurrently`, `serve` and  `wait-on` npm packages.
    // It is better to build storybook and serve that rather than running storybook dev for performance reasons.
    "test:storybook": "npm run build-storybook && concurrently --kill-others --success first \"serve ./storybook-static\" \"wait-on tcp:<PORT> && test-storybook --url http://localhost:<PORT>"
  }
}
```

```typescript
// .storybook/preview.ts
import { preview as repodogPreview } from '@repodog/storybook-config/preview';

export default {
  ...repodogPreview,
};
```

### With Babel

```typescript
// .storybook/main.ts
import babelPreset from '@repodog/babel-preset';
import { config as storybookConfig } from '@repodog/storybook-config';

export default {
  ...storybookConfig({ compiler: ['babel', babelPreset()] }),
};
```

### With SWC

```typescript
// .storybook/main.ts
import { config as storybookConfig } from '@repodog/storybook-config';
import swcConfig from '@repodog/swc-config';

export default  {
  ...storybookConfig({ compiler: ['swc', swcConfig.ts] })
  // or
  ...storybookConfig({ compiler: ['swc', swcConfig.js] })
};
```

### Coverage reporting

Below is a script configuration for running unit tests and storybook tests and merging their respective coverage reports. It requires installing additional dev dependencies.

```json
// package.json
{
  "scripts": {
    "build-storybook": "storybook build",
    // Requires `nyc` npm package
    "generate-coverage": "nyc report --reporter=lcov -t coverage --report-dir coverage && open ./coverage/lcov-report/index.html",
    // Requires `istanbul-merge` npm package
    "merge-coverage": "istanbul-merge --out coverage/coverage.json coverage/unit/coverage-final.json coverage/storybook/coverage-storybook.json",
    "storybook": "storybook dev -p <PORT>",
    // Requires `del-cli` npm package
    "test": "del-cli ./coverage && npm run test:storybook && npm run test:unit && pnpm run merge-coverage && pnpm run generate-coverage",
    // Requires optional peer @storybook/test-runner and `concurrently`, `serve` and  `wait-on` npm packages.
    // Also includes saving coverage to "coverage/storybook"
    "test:storybook": "npm run build-storybook && concurrently --kill-others --success first \"serve ./storybook-static\" \"wait-on tcp:<PORT> && test-storybook --url http://localhost:<PORT> --coverage --coverageDirectory coverage/storybook\"",
    // Includes saving coverage to "coverage/unit"
    "test:unit": "node --require=suppress-experimental-warnings --experimental-vm-modules node_modules/jest/bin/jest.js --coverageDirectory coverage/unit",
  }
}
```
