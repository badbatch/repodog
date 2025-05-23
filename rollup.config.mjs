// false positive
// eslint-disable-next-line import-x/no-unresolved
import babelConfig from '@repodog/babel-config/rollup';
import rollupConfig from '@repodog/rollup-config';
import swcConfig from '@repodog/swc-config';
import { babel as babelPlugin } from '@rollup/plugin-babel';
import swcPlugin from '@rollup/plugin-swc';

const { COMPILER = 'swc' } = process.env;

// rollup requires config to be default export
// eslint-disable-next-line import-x/no-default-export
export default {
  ...rollupConfig({ compiler: COMPILER === 'swc' ? swcPlugin({ swc: swcConfig.ts }) : babelPlugin(babelConfig) }),
};
