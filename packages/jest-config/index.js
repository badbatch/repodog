const { consts, loadRepositoryConfig } = require('@repodog/config-helpers');

const { MONOREPO } = consts;

const commonCollectCoverageFrom = [
  '!**/types.ts',
  '!**/types.ts',
  '!**/*.test.*',
  '!**/__tests__/**',
  '!**/__TESTS__/**',
  '!**/__mocks__/**',
  '!**/__MOCKS__/**',
];

const singePackageConfig = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', ...commonCollectCoverageFrom],
  testMatch: ['<rootDir>/src/**/*.test.*'],
};

const multiPackageConfig = {
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx}',
    '!**/bin/**',
    '!**/lib/**',
    '!**/node_modules/**',
    ...commonCollectCoverageFrom,
  ],
  testMatch: ['<rootDir>/packages/**/*.test.*'],
};

const { features } = loadRepositoryConfig();

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text-summary'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/__snapshots__/', '/lib/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  ...(features.includes(MONOREPO) ? multiPackageConfig : singePackageConfig),
};
