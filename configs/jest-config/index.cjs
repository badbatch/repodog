const packageDir = process.cwd();
let packageName;

try {
  packageName = require(`${packageDir}/package.json`).name;
} catch {
  // no catch
}

const { COMPILER = 'babel', DEBUG, JS_ENV, MODULE_SYSTEM = 'esm' } = process.env;
const isCjs = MODULE_SYSTEM === 'cjs';

if (isCjs) {
  if (COMPILER === 'babel') {
    process.env.BABEL_MODULE_SYSTEM = 'cjs';
  } else {
    process.env.SWC_MODULE_SYSTEM = 'cjs';
  }
}

const isDebug = DEBUG === 'true';
const isJsEnvWeb = JS_ENV === 'web';
const isSwc = COMPILER === 'swc';
const moduleNameMapper = {};
const transform = {};

if (isJsEnvWeb) {
  moduleNameMapper[String.raw`^.+\.css$`] = 'identity-obj-proxy';
  transform[String.raw`^.+\.css$`] = `${__dirname}/cssTransformer.cjs`;
  transform[String.raw`^(?!.*\.(css|mjs|cjs|js|jsx|json|ts|tsx)$)`] = `${__dirname}/fileTransformer.cjs`;
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
    '<rootDir>/**/__tests__/*.{mjs,cjs,js,jsx,ts,tsx}',
  );
}

// See https://github.com/swc-project/jest/issues/115 for explanation
// of why this handling is necessary.
const handleSwcConfigArray = options => {
  const castOptions = Array.isArray(options) ? options : [options];

  for (const { test = String.raw`^.+\.(mjs|cjs|js|jsx|ts|tsx)$`, ...rest } of castOptions) {
    transform[test] = ['@swc/jest', { ...rest, sourceMaps: 'inline' }];
  }
};

const config = ({ compilerOptions = {} } = {}) => {
  if (isSwc) {
    console.log('> Using @repodog/swc-config');
    handleSwcConfigArray(compilerOptions);
  } else {
    console.log('> Using @repodog/babel-config');
    transform[String.raw`^.+\.(mjs|cjs|js|jsx|ts|tsx)$`] = `${__dirname}/babelTransformer.cjs`;
  }

  return {
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
    extensionsToTreatAsEsm: isCjs ? [] : ['.jsx', '.ts', '.tsx'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'cjs', 'jsx', 'json'],
    moduleNameMapper,
    rootDir: packageDir,
    testEnvironment: isJsEnvWeb ? 'jsdom' : 'node',
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
    testTimeout: isDebug ? 999_999 : 5000,
    transform,
  };
};

module.exports = config;
