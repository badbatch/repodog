/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');

const { NODE_ENV } = process.env;
const isProdEnv = NODE_ENV === 'production' || NODE_ENV === 'prod';

// See https://github.com/swc-project/jest/issues/115 for explanation
// of why this handling is necessary.
const handleSwcConfigArray = (name, options) => {
  const castOptions = Array.isArray(options) ? options : [options];

  return castOptions.map(({ test = '\\.(mjs|cjs|jsx?|tsx?)$', ...rest }) => ({
    test: new RegExp(test),
    use: {
      loader: require.resolve(name),
      options: rest,
    },
  }));
};

module.exports = ({ compiler } = {}) => {
  const [name, options = {}] = Array.is(compiler) ? compiler : [compiler];
  const isCompilerSwc = name === 'swc-loader';

  return {
    devtool: isProdEnv ? 'none' : 'source-map',
    mode: isProdEnv ? 'production' : 'development',
    module: {
      rules: [
        ...(isCompilerSwc
          ? handleSwcConfigArray(name, options)
          : [
              {
                test: /\.(mjs|cjs|jsx?|tsx?)$/,
                use: {
                  loader: require.resolve(name),
                  options,
                },
              },
            ]),
        ...(isProdEnv
          ? []
          : [
              {
                enforce: 'pre',
                test: /\.(mjs|cjs|jsx?|tsx?)$/,
                use: {
                  loader: require.resolve('source-map-loader'),
                },
              },
            ]),
      ],
    },
    plugins: [
      ...(isProdEnv
        ? []
        : [
            new webpack.SourceMapDevToolPlugin({
              moduleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
              test: /\.(mjs|cjs|jsx?|tsx?)$/,
            }),
          ]),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
      mainFields: ['browser', 'module', 'main'],
      symlinks: true,
    },
  };
};
