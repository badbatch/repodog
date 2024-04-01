# @repodog/storybook-config

The Repodog Storybook config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fstorybook-config.svg)](https://badge.fury.io/js/%40repodog%2Fstorybook-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install package

```shell
# terminal
npm install @repodog/storybook-config --save-dev
```

## Install dependencies

```shell
# terminal
npm install @storybook/addon-a11y @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/nextjs @storybook/react @storybook/test chromatic eslint-plugin-storybook storybook --save-dev
```

## Install optional dependencies

```shell
# terminal
npm install @chanzuckerberg/axe-storybook-testing @swc/core chromatic eslint-plugin-storybook --save-dev
```

## Use package

```json
// package.json
{
  "scripts": {
    "build-storybook": "storybook build",
    "storybook": "storybook dev -p <PORT>",
    "test:axe": "npm run build-storybook && axe-storybook"
  }
}
```

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@repodog/eslint-config', 'plugin:storybook/recommended'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
};
```

### With SWC

```typescript
// .storybook/main.ts
import { config as storybookConfig } from '@repodog/storybook-config';
import swcConfig from '@repodog/swc-config';
import { type StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  ...storybookConfig({ compiler: ['swc', swcConfig.ts] })
  // or
  ...storybookConfig({ compiler: ['swc', swcConfig.js] })
};

export default config;
```

### With Babel

```typescript
// .storybook/main.ts
import { config as storybookConfig } from '@repodog/storybook-config';
import { type StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  ...storybookConfig()
};

export default config;
```

```typescript
// .storybook/preview.ts
import { preview as repodogPreview } from '@repodog/storybook-config/preview';
import { type Preview } from '@storybook/react';

const preview: Preview = {
  ...repodogPreview
};

export default preview;
```
