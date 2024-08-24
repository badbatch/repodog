const { COMPILER, DEBUG } = process.env;

if (!COMPILER) {
  process.env.COMPILER = 'swc';
}

const jestConfig = require('@repodog/jest-config');
const swcConfig = require('@repodog/swc-config');

const isDebug = DEBUG === 'true';
const config = jestConfig({ compilerOptions: swcConfig });

module.exports = {
  ...config,
  collectCoverageFrom: ['cli/**/*.ts', ...config.collectCoverageFrom.slice(1)],
  ...(isDebug ? {} : { testMatch: ['**/src/**/*.test.ts'] }),
};
