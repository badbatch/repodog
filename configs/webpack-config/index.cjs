/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');

const { NODE_ENV } = process.env;
const isProdEnv = NODE_ENV === 'production' || NODE_ENV === 'prod';

module.exports = ({ compiler } = {}) => {
  const [name, options = {}] = Array.is(compiler) ? compiler : [compiler];

  return {
    devtool: isProdEnv ? 'none' : 'source-map',
    mode: isProdEnv ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(mjs|cjs|jsx?|tsx?)$/,
          use: {
            loader: require.resolve(name),
            options,
          },
        },
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
