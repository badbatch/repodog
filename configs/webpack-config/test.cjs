const glob = require('glob');
const path = require('node:path');
const config = require('./index.cjs');

module.exports = ({ testsPath = 'tests/browser' } = {}) => ({
  ...config,
  entry: glob.sync(`./${testsPath}/*.test.ts`).map(path => `./${path}`),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, `${testsPath}/dist`),
  },
});
