import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const config = () => {
  const { BABEL_MODULE_SYSTEM, DEBUG, JS_ENV, NODE_ENV } = process.env;
  const isDebug = DEBUG === 'true';
  const isCjs = BABEL_MODULE_SYSTEM === 'cjs';
  const isJsEnvWeb = JS_ENV === 'web';
  const isProdEnv = NODE_ENV === 'production';
  let targets: string;

  if (isJsEnvWeb) {
    targets = isDebug ? 'last 1 Chrome version' : 'defaults';
  } else {
    targets = isDebug ? 'current node' : 'maintained node versions';
  }

  const plugins = [
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    [require.resolve('@babel/plugin-syntax-import-attributes'), { deprecatedAssertSyntax: true }],
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: !isCjs,
      },
    ],
    require.resolve('babel-plugin-codegen'),
    require.resolve('babel-plugin-macros'),
  ];

  const presets = [
    [
      require.resolve('@babel/preset-env'),
      {
        debug: isDebug,
        modules: isCjs ? 'commonjs' : false,
        targets,
        useBuiltIns: false,
      },
    ],
    [
      require.resolve('@babel/preset-react'),
      {
        development: !isProdEnv,
        runtime: 'automatic',
        useBuiltIns: true,
        useSpread: true,
      },
    ],
    [
      require.resolve('@babel/preset-typescript'),
      {
        allowDeclareFields: true,
        allowNamespaces: true,
        onlyRemoveTypeImports: false,
        optimizeConstEnums: true,
      },
    ],
  ];

  return {
    comments: false,
    plugins,
    presets,
  };
};

export default config;
