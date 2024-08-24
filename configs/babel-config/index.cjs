module.exports = api => {
  const { BABEL_DISABLE_CACHE, BABEL_MODULE_SYSTEM, DEBUG, JS_ENV, NODE_ENV } = process.env;

  if (BABEL_DISABLE_CACHE === 'true') {
    api.cache.never();
  } else {
    api.cache.using(() => JS_ENV);
  }

  const isDebug = DEBUG === 'true';
  const isCjs = BABEL_MODULE_SYSTEM === 'cjs';
  const isJsEnvWeb = JS_ENV === 'web';
  const isProdEnv = NODE_ENV === 'production';
  const isTestEnv = NODE_ENV === 'test';
  const ignore = ['node_modules/**', '**/node_modules/**'];

  if (!isTestEnv) {
    ignore.push('**/*.spec.*', '**/*.test.*', '**/__testUtils__/**', '**/__tests__/**', '**/__mocks__/**');
  }

  let targets;

  if (isJsEnvWeb) {
    targets = isDebug ? 'last 1 Chrome version' : 'defaults';
  } else {
    targets = isDebug ? 'current node' : 'maintained node versions';
  }

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-syntax-import-attributes', { deprecatedAssertSyntax: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: !isCjs,
      },
    ],
    'babel-plugin-codegen',
    'babel-plugin-macros',
  ];

  const presets = [
    [
      '@babel/preset-env',
      {
        debug: isDebug,
        modules: isCjs ? 'commonjs' : false,
        targets,
        useBuiltIns: false,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !isProdEnv,
        runtime: 'automatic',
        useBuiltIns: true,
        useSpread: true,
      },
    ],
    [
      '@babel/preset-typescript',
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
    ignore,
    plugins,
    presets,
  };
};
