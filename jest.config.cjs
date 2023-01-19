const config = require('@repodog/jest-config');

module.exports = {
  ...config,
  projects: ['<rootDir>/packages/*'],
  setupFilesAfterEnv: ['./jest.setup.cjs'],
};
