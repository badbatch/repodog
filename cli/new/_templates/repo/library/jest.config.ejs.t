---
to: jest.config.cjs
---
const config = require('@repodog/jest-config');

module.exports = {
  ...config,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
};
