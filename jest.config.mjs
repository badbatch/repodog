// False positive
// eslint-disable-next-line import-x/order
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { COMPILER, DEBUG } = process.env;

if (!COMPILER) {
  process.env.COMPILER = 'swc';
}

const jestConfig = require('@repodog/jest-config').default;
const swcConfig = require('@repodog/swc-config');

const isDebug = DEBUG === 'true';
const config = jestConfig({ compilerOptions: swcConfig });

// Required by Jest
// eslint-disable-next-line import-x/no-default-export
export default {
  ...config,
  collectCoverageFrom: ['cli/**/*.ts', ...config.collectCoverageFrom.slice(1)],
  ...(!isDebug && { testMatch: ['**/src/**/*.test.ts'] }),
};
