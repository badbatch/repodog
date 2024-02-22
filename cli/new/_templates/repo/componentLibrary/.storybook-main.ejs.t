---
to: .storybook/main.ts
---
import { config as storybookConfig } from '@repodog/storybook-config';
import swcConfig from '@repodog/swc-config';
import { type StorybookConfig } from '@storybook/nextjs';

// storybook swc type conflicts with swc type
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const config = {
  ...storybookConfig({ compiler: ['swc', swcConfig.ts] }),
} as StorybookConfig;

// Storybook requires this to be default export.
// eslint-disable-next-line import/no-default-export
export default config;
