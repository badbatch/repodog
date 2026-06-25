import { fileURLToPath } from 'node:url';

const resolvePath = name => fileURLToPath(import.meta.resolve(name));

const config = () => {
  const { BABEL_MODULE_SYSTEM, DEBUG, JS_ENV, NODE_ENV } = process.env;
  const isDebug = DEBUG === 'true';
  const isCjs = BABEL_MODULE_SYSTEM === 'cjs';
  const isJsEnvWeb = JS_ENV === 'web';
  const isProdEnv = NODE_ENV === 'production';
  let targets;

  if (isJsEnvWeb) {
    targets = isDebug ? 'last 1 Chrome version' : 'defaults';
  } else {
    targets = isDebug ? 'current node' : 'maintained node versions';
  }

  const plugins = [
    [resolvePath('@babel/plugin-proposal-decorators'), { version: '2023-11' }],
    resolvePath('@babel/plugin-syntax-import-attributes'),
    resolvePath('babel-plugin-codegen'),
    resolvePath('babel-plugin-macros'),
  ];

  const presets = [
    [
      resolvePath('@babel/preset-env'),
      {
        corejs: '3.38.0',
        debug: isDebug,
        modules: isCjs ? 'commonjs' : false,
        targets,
        useBuiltIns: 'usage',
      },
    ],
    [
      resolvePath('@babel/preset-react'),
      {
        development: !isProdEnv,
        runtime: 'automatic',
        useBuiltIns: true,
        useSpread: true,
      },
    ],
    [
      resolvePath('@babel/preset-typescript'),
      {
        allowDeclareFields: true,
        onlyRemoveTypeImports: false,
      },
    ],
  ];

  return {
    comments: false,
    plugins,
    presets,
  };
};

// Required for Babel
// eslint-disable-next-line import-x/no-default-export
export default config;
