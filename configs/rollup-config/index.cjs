/* eslint-disable import-x/no-extraneous-dependencies */
const commonjs = require('@rollup/plugin-commonjs');
const image = require('@rollup/plugin-image');
const json = require('@rollup/plugin-json');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const { existsSync, mkdirSync, writeFileSync } = require('node:fs');
const { basename } = require('node:path');
const { plugin: analyzer } = require('rollup-plugin-analyzer');
const copy = require('rollup-plugin-copy');
const sourcemaps = require('rollup-plugin-sourcemaps');

const { MODULE_SYSTEM = 'esm', NODE_ENV } = process.env;
const isProdEnv = NODE_ENV === 'production' || NODE_ENV === 'prod';
const packageDir = process.cwd();
const external = id => !id.startsWith('.') && !id.startsWith('/');
const outputExtension = MODULE_SYSTEM === 'esm' ? 'mjs' : 'cjs';

const sourcemapPathTransform = sourcePath => {
  if (/node_modules/.test(sourcePath)) {
    return sourcePath;
  }

  return sourcePath.replace('../../src', `../${basename(packageDir)}/src/`);
};

const config = (options = {}) => {
  console.log(`> Using @repodog/${options.compiler.name}-config`);
  const extensions = ['.mjs', '.cjs', '.js', '.jsx', '.json', '.ts', '.tsx'];

  if (!options.compiler) {
    throw new Error('config.compiler is a required option. Both babel and swc rollup plugins are supported.');
  }

  const plugins = [
    json(),
    nodeResolve({
      extensions,
      preferBuiltins: true,
    }),
    commonjs(),
    options.compiler,
    image(),
  ];

  if (options.copy) {
    plugins.push(copy(options.copy));
  }

  if (isProdEnv) {
    plugins.push(
      terser(),
      analyzer({
        writeTo: analysis => {
          if (!existsSync(`${packageDir}/dist`)) {
            mkdirSync(`${packageDir}/dist`);
          }

          writeFileSync(`${packageDir}/dist/production.analysis.txt`, analysis);
        },
      }),
    );
  }

  if (!isProdEnv) {
    plugins.push(sourcemaps());
  }

  return {
    external,
    input: `${packageDir}/src/index`,
    onwarn: ({ code, message }) => {
      if (code !== 'THIS_IS_UNDEFIEND') {
        console.error(message);
      }
    },
    output: {
      file: `${packageDir}/dist/${MODULE_SYSTEM}/index.${outputExtension}`,
      format: MODULE_SYSTEM,
      sourcemap: true,
      sourcemapPathTransform,
    },
    plugins,
  };
};

module.exports = config;
