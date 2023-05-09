/* eslint-disable import/no-extraneous-dependencies */
const { babel } = require('@rollup/plugin-babel');
const image = require('@rollup/plugin-image');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const { existsSync, mkdirSync, writeFileSync } = require('node:fs');
const { basename } = require('node:path');
const { plugin: analyzer } = require('rollup-plugin-analyzer');
const copy = require('rollup-plugin-copy');
const sourcemaps = require('rollup-plugin-sourcemaps');

const { NODE_ENV } = process.env;
const isProductionEnvironment = NODE_ENV === 'production' || NODE_ENV === 'prod';
const packageDirectory = process.cwd();
const external = id => !id.startsWith('.') && !id.startsWith('/');

const sourcemapPathTransform = sourcePath => {
  if (/node_modules/.test(sourcePath)) {
    return sourcePath;
  }

  return sourcePath.replace('../../src', `../${basename(packageDirectory)}/src/`);
};

module.exports = (config = {}) => {
  const extensions = ['.mjs', '.cjs', '.js', '.jsx', '.json', '.ts', '.tsx'];

  const plugins = [
    json(),
    nodeResolve({
      extensions,
      preferBuiltins: true,
    }),
    babel({
      babelHelpers: 'runtime',
      extensions,
      rootMode: 'upward',
    }),
    image(),
  ];

  if (config.copy) {
    plugins.push(copy(config.copy));
  }

  if (isProductionEnvironment) {
    plugins.push(
      terser(),
      analyzer({
        writeTo: analysis => {
          if (!existsSync(`${packageDirectory}/dist`)) {
            mkdirSync(`${packageDirectory}/dist`);
          }

          writeFileSync(`${packageDirectory}/dist/production.analysis.txt`, analysis);
        },
      })
    );
  }

  if (!isProductionEnvironment) {
    plugins.push(sourcemaps());
  }

  return {
    external,
    input: `${packageDirectory}/src/index`,
    onwarn: ({ code, message }) => {
      if (code !== 'THIS_IS_UNDEFIEND') {
        console.error(message); // eslint-disable-line no-console
      }
    },
    output: {
      file: `${packageDirectory}/dist/main/index.mjs`,
      format: 'esm',
      sourcemap: true,
      sourcemapPathTransform,
    },
    plugins,
  };
};
