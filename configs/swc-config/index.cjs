const { DEBUG, JS_ENV, NODE_ENV, SWC_MODULE_SYSTEM } = process.env;
const isDebug = DEBUG === 'true';
const isCjs = SWC_MODULE_SYSTEM === 'cjs';
const isJsEnvWeb = JS_ENV === 'web';
const isProdEnv = NODE_ENV === 'production';
let targets;

if (isJsEnvWeb) {
  targets = isDebug ? 'last 1 Chrome version' : 'defaults';
} else {
  targets = isDebug ? 'current node' : 'maintained node versions';
}

const sharedConfig = {
  env: {
    coreJs: '3.38.0',
    debug: isDebug,
    mode: 'usage',
    targets,
  },
  isModule: !isCjs,
  jsc: {
    keepClassNames: true,
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
  swcrc: false,
};

const configs = [
  {
    ...sharedConfig,
    jsc: {
      ...sharedConfig.jsc,
      parser: {
        dynamicImport: true,
        syntax: 'typescript',
        tsx: true,
      },
    },
    test: String.raw`.*\.tsx?$`,
  },
  {
    ...sharedConfig,
    jsc: {
      ...sharedConfig.jsc,
      parser: {
        dynamicImport: true,
        jsx: true,
        syntax: 'ecmascript',
      },
    },
    test: String.raw`.*\.(mjs|cjs|jsx?)$`,
  },
];

Object.defineProperty(configs, 'ts', {
  get: () => configs[0],
});

Object.defineProperty(configs, 'js', {
  get: () => configs[1],
});

module.exports = configs;
