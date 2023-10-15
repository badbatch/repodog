const config = require('@repodog/jest-config');

const { DEBUG } = process.env;
const isDebug = DEBUG === 'true';

module.exports = {
  ...config,
  collectCoverageFrom: ['cli/**/*.ts', ...config.collectCoverageFrom.slice(1)],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
  ...(isDebug ? {} : { testMatch: ['**/src/**/*.test.ts'] }),
};
