const glob = require('glob');
const path = require('node:path');
const config = require('./index.cjs');

const testConfig = ({ compiler, testsPath = 'tests/browser' } = {}) => ({
  ...config({ compiler }),
  entry: glob.sync(`./${testsPath}/**/*.test.*`).map(file => `./${file}`),
  output: {
    filename: 'index.js',
    path: path.resolve(process.cwd(), `${testsPath}/dist`),
  },
});

module.exports = testConfig;
