/* eslint-disable import/no-extraneous-dependencies */
const { babel } = require('@rollup/plugin-babel');
const image = require('@rollup/plugin-image');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { outputFileSync } = require('fs-extra');
const { basename } = require('path');
const { plugin: analyzer } = require('rollup-plugin-analyzer');
const copy = require('rollup-plugin-copy');
const sourcemaps = require('rollup-plugin-sourcemaps');
const { terser } = require('rollup-plugin-terser');

const { NODE_ENV } = process.env;
const isNodeEnvProd = NODE_ENV === 'production' || NODE_ENV === 'prod';
const packageDir = process.cwd();

module.exports = (config = {}) => {
  const extensions = ['.mjs', '.cjs', '.js', '.jsx', '.json', '.ts', '.tsx'];
  const external = id => !id.startsWith('.') && !id.startsWith('/');

  const sourcemapPathTransform = sourcePath => {
    if (/node_modules/.test(sourcePath)) {
      return sourcePath;
    }

    return sourcePath.replace('../../src', `../${basename(packageDir)}/src/`);
  };

  const plugins = [
    nodeResolve({
      extensions,
      preferBuiltins: true,
    }),
    babel({
      babelHelpers: 'runtime',
      extensions,
      rootMode: 'upward',
    }),
    json(),
    image(),
  ];

  if (config.copy) {
    plugins.push(copy(config.copy));
  }

  if (isNodeEnvProd) {
    plugins.push(
      terser(),
      analyzer({
        writeTo: analysis => {
          outputFileSync(`${packageDir}/dist/production.analysis.txt`, analysis);
        },
      })
    );
  }

  if (!isNodeEnvProd) {
    plugins.push(sourcemaps());
  }

  return {
    external,
    input: `${packageDir}/src/index`,
    onwarn: ({ code, message }) => {
      if (code !== 'THIS_IS_UNDEFIEND') {
        console.error(message); // eslint-disable-line no-console
      }
    },
    output: {
      file: `${packageDir}/dist/main/index.mjs`,
      format: 'esm',
      sourcemap: true,
      sourcemapPathTransform,
    },
    plugins,
  };
};
