import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, isAbsolute, resolve } from 'node:path';
import analyzer from 'rollup-plugin-analyzer';
import copy from 'rollup-plugin-copy';
import sourcemaps from 'rollup-plugin-sourcemaps';
// false positive
// eslint-disable-next-line import-x/no-unresolved
import macros from 'unplugin-macros/rollup';

const { MODULE_SYSTEM = 'esm', NODE_ENV } = process.env;
const isProdEnv = NODE_ENV === 'production';
const packageDir = process.cwd();
const external = id => !id.startsWith('.') && !id.startsWith('#') && !isAbsolute(id);
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
    }),
    commonjs(),
    macros(),
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
    input: resolve(packageDir, 'src', 'index'),
    onwarn: ({ code, message }) => {
      if (code !== 'THIS_IS_UNDEFINED') {
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

// rollup requires config to be default export
// eslint-disable-next-line import-x/no-default-export
export default config;
