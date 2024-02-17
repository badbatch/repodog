const { DEBUG, JS_ENV, NODE_ENV, SWC_MODULE_SYSTEM, TEST_ENV } = process.env;
const isDebug = DEBUG === 'true';
const isCjs = SWC_MODULE_SYSTEM === 'cjs';
const isJsEnvWeb = JS_ENV === 'web';
const isProdEnv = NODE_ENV === 'prod' || NODE_ENV === 'production';
const isTestEnv = TEST_ENV === 'true';
const exclude = ['node_modules/**', '**/node_modules/**'];

if (!isTestEnv) {
  exclude.push('**/*.spec.*', '**/*.test.*', '**/__testUtils__/**', '**/__tests__/**', '**/__mocks__/**');
}

let targets;

if (isJsEnvWeb) {
  targets = isDebug ? 'last 1 Chrome version' : 'defaults';
} else {
  targets = isDebug ? 'current node' : 'maintained node versions';
}

const sharedConfig = {
  env: {
    coreJs: '3.36.0',
    debug: isDebug,
    exclude,
    mode: 'usage',
    targets,
  },
  isModule: !isCjs,
  jsc: {
    keepClassNames: true,
    parser: {
      decorators: false,
      dynamicImport: false,
      externalHelpers: true,
    },
    transform: {
      react: {
        development: !isProdEnv,
        runtime: 'automatic',
        useBuiltIns: true,
      },
    },
  },
  module: {
    type: isCjs ? 'commonjs' : 'es6',
  },
  sourceMaps: true,
};

module.exports = [
  {
    test: '.*\\.tsx?$',
    ...sharedConfig,
    jsc: {
      ...sharedConfig.jsc,
      parser: {
        syntax: 'typescript',
        tsx: true,
        ...sharedConfig.jsc.parser,
      },
    },
  },
  {
    test: '.*\\.(mjs|cjs|jsx?)$',
    ...sharedConfig,
    jsc: {
      ...sharedConfig.jsc,
      parser: {
        jsx: true,
        syntax: 'ecmascript',
        ...sharedConfig.jsc.parser,
      },
    },
  },
];
