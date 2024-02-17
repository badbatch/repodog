# @repodog/storybook-config

The RepoDog Storybook config.

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
npm install @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/addon-onboarding @storybook/cli @storybook/nextjs @storybook/react @storybook/test eslint-plugin-storybook --save-dev
```

## Use package

```json
// package.json
{
  "scripts": {
    "storybook": "storybook dev -p <PORT>",
    "build-storybook": "storybook build"
  }
}
```

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@repodog/eslint-config', '@repodog/storybook-config/eslint-config'],
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
import { type StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  ...storybookConfig({ compiler: 'swc' })
};

export default config;
```

### With Babel

```typescript
// .storybook/main.ts
import { config as storybookConfig } from '@repodog/storybook-config';
import { type StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  ...storybookConfig({ compiler: 'babel' })
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
