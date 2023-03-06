const packageDirectory = process.cwd();
let packageName;

try {
  packageName = require(`${packageDirectory}/package.json`).name;
} catch {
  // no catch
}

const { DEBUG, JS_ENV } = process.env;
const isDebug = DEBUG === 'true';
const isJsEnvironmentWeb = JS_ENV === 'web';
process.env.TEST_ENV = 'true';

const moduleNameMapper = {
  // Required to map .js file extensions on relative import statements to .ts
  '^(\\.{1,2}/.*)\\.js$': '$1',
};

const transform = {
  '^.+\\.(mjs|cjs|js|jsx|ts|tsx)$': `${__dirname}/babelTransformer.cjs`,
};

if (isJsEnvironmentWeb) {
  moduleNameMapper['^.+\\.css$'] = 'identity-obj-proxy';
  transform['^.+\\.css$'] = `${__dirname}/cssTransformer.cjs`;
  transform['^(?!.*\\.(css|mjs|cjs|js|jsx|json|ts|tsx)$)'] = `${__dirname}/fileTransformer.cjs`;
}

const testMatch = [
  '<rootDir>/src/**/*.spec.{mjs,cjs,js,jsx,ts,tsx}',
  '<rootDir>/src/**/*.test.{mjs,cjs,js,jsx,ts,tsx}',
  '<rootDir>/src/**/__tests__/*.{mjs,cjs,js,jsx,ts,tsx}',
];

if (isDebug) {
  testMatch.push(
    '<rootDir>/**/*.spec.{mjs,cjs,js,jsx,ts,tsx}',
    '<rootDir>/**/*.test.{mjs,cjs,js,jsx,ts,tsx}',
    '<rootDir>/**/__tests__/*.{mjs,cjs,js,jsx,ts,tsx}'
  );
}

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{mjs,cjs,js,jsx,ts,tsx}',
    '!**/types.ts',
    '!**/*.spec.*',
    '!**/*.test.*',
    '!**/*.types.ts',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/__testUtils__/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'lcov', 'text-summary'],
  displayName: packageName,
  extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
  moduleFileExtensions: ['mjs', 'cjs', 'js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper,
  rootDir: packageDirectory,
  testEnvironment: isJsEnvironmentWeb ? 'jsdom' : 'node',
  testMatch,
  testPathIgnorePatterns: [
    '/build/',
    '/config/',
    '/dist/',
    '/e2e/',
    '/lib/',
    '/public/',
    '/reports/',
    '/__snapshots__/',
  ],
  transform,
};
