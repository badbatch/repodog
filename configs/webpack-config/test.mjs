import { sync } from 'glob';
import path from 'node:path';
import config from './index.mjs';

const testConfig = ({ compiler, testsPath = 'tests/browser' } = {}) => ({
  ...config({ compiler }),
  entry: sync(`./${testsPath}/**/*.test.*`).map(file => `./${file}`),
  output: {
    filename: 'index.js',
    path: path.resolve(process.cwd(), `${testsPath}/dist`),
  },
});

// Required for Webpack
// eslint-disable-next-line import-x/no-default-export
export default testConfig;
