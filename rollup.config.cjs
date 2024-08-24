const babelConfig = require('@repodog/babel-config/rollup');
const rollupConfig = require('@repodog/rollup-config');
const swcConfig = require('@repodog/swc-config');
const { babel: babelPlugin } = require('@rollup/plugin-babel');
const swcPlugin = require('@rollup/plugin-swc');

const { COMPILER = 'swc' } = process.env;

module.exports = {
  ...rollupConfig({ compiler: COMPILER === 'swc' ? swcPlugin({ swc: swcConfig.ts }) : babelPlugin(babelConfig) }),
};
