const config = require('../../rollup.config.cjs');

const { input, output, ...rest } = config;

module.exports = [
  config,
  {
    ...rest,
    input: input.replace('index', 'preview'),
    output: {
      ...output,
      file: output.file.replace('index', 'preview'),
    },
  },
];
