---
to: jest.config.cjs
---
const config = require('@repodog/jest-config');

const { DEBUG } = process.env;
const isDebug = DEBUG === 'true';

module.exports = {
  ...config,
  collectCoverageFrom: ['<%= packagesDirName %>/**/*.{ts,tsx}', ...config.collectCoverageFrom.slice(1)],
  ...(isDebug ? {} : { testMatch: ['**/src/**/*.test.*'] }),
};
