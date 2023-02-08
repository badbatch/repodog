const config = require('@repodog/jest-config');

module.exports = {
  ...config,
  projects: ['<rootDir>/configs/*', '<rootDir>/cli/*'],
  setupFilesAfterEnv: ['./jest.setup.cjs'],
};
