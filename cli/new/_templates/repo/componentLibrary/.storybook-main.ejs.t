---
to: .storybook/main.ts
---
import { config as storybookConfig } from '@repodog/storybook-config';
import swcConfig from '@repodog/swc-config';

// Storybook requires this to be default export.
// eslint-disable-next-line import/no-default-export
export default  {
  ...storybookConfig({ compiler: ['swc', swcConfig.ts] }),
};
