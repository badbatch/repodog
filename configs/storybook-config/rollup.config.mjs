import config from '../../rollup.config.mjs';

const { input, ...rest } = config;

// rollup requires config to be default export
// eslint-disable-next-line import-x/no-default-export
export default [
  config,
  {
    ...rest,
    input: input.replace('index', 'preview'),
  },
];
