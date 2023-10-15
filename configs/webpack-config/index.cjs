const webpack = require('webpack');

const { NODE_ENV } = process.env;
const isProdEnv = NODE_ENV === 'production' || NODE_ENV === 'prod';

module.exports = {
  devtool: isProdEnv ? 'none' : 'source-map',
  mode: isProdEnv ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
        },
      },
      ...(isProdEnv
        ? []
        : [
            {
              enforce: 'pre',
              test: /\.(tsx?|jsx?)$/,
              use: {
                loader: 'source-map-loader',
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
            test: /\.(tsx?|jsx?)$/,
          }),
        ]),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
    mainFields: ['browser', 'module', 'main'],
    symlinks: false,
  },
};