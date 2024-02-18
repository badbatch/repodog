const { existsSync } = require('node:fs');
const { resolve } = require('node:path');

const { DEBUG, JS_ENV, NODE_ENV, SWC_MODULE_SYSTEM } = process.env;
const isDebug = DEBUG === 'true';
const isCjs = SWC_MODULE_SYSTEM === 'cjs';
const isJsEnvWeb = JS_ENV === 'web';
const isProdEnv = NODE_ENV === 'prod' || NODE_ENV === 'production';
const isTypescript = existsSync(resolve(process.cwd(), 'tsconfig.json'));
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

module.exports = isTypescript
  ? {
      ...sharedConfig,
      jsc: {
        ...sharedConfig.jsc,
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
      },
    }
  : {
      ...sharedConfig,
      jsc: {
        ...sharedConfig.jsc,
        parser: {
          jsx: true,
          syntax: 'ecmascript',
        },
      },
    };
