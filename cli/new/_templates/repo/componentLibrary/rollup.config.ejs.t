---
to: rollup.config.mjs
---
import rollupConfig from '@repodog/rollup-config';
import swcConfig from '@repodog/swc-config';
import swcPlugin from '@rollup/plugin-swc';

export default {
  ...rollupConfig({ compiler: swcPlugin({ swc: swcConfig.ts }) }),
};
