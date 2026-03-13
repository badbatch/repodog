const glob = require('glob');
const path = require('node:path');
const config = require('./index.cjs');

const testConfig = ({ compiler, include = path.resolve(process.cwd(), 'src'), testsPath = 'tests/browser' } = {}) => ({
  ...config({ compiler }),
  entry: glob.sync(`./${testsPath}/**/*.test.*`).map(file => `./${file}`),
  module: {
    rules: [
      ...(config.module?.rules ?? []),
      {
        enforce: 'post',
        exclude: /node_modules|\.(spec|test)\.*$/,
        include,
        test: /\.(mjs|cjs|jsx?|tsx?)$/,
        use: {
          loader: require.resolve('istanbul-instrumenter-loader'),
          options: { esModules: true },
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(process.cwd(), `${testsPath}/dist`),
  },
});

module.exports = testConfig;
