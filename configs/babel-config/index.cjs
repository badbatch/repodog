module.exports = api => {
  const { BABEL_DISABLE_CACHE, DEBUG, JS_ENV, NODE_ENV, TEST_ENV } = process.env;

  if (BABEL_DISABLE_CACHE) {
    api.cache.never();
  } else {
    api.cache.using(() => JS_ENV);
  }

  const isDebug = DEBUG === 'true';
  const isJsEnvironmentWeb = JS_ENV === 'web';
  const isProductionEnvironment = NODE_ENV === 'prod' || NODE_ENV === 'production';
  const isTestEnvironment = TEST_ENV === 'true';
  const ignore = ['node_modules/**', '**/node_modules/**'];

  if (!isTestEnvironment) {
    ignore.push('**/*.spec.*', '**/*.test.*', '**/__testUtils__/**', '**/__tests__/**', '**/__mocks__/**');
  }

  let targets;

  if (isJsEnvironmentWeb) {
    targets = isDebug ? 'last 1 Chrome version' : 'defaults';
  } else {
    targets = isDebug ? 'current node' : 'maintained node versions';
  }

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-assertions',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    'babel-plugin-codegen',
    'babel-plugin-lodash',
    'babel-plugin-macros',
  ];

  const presets = [
    [
      '@babel/preset-env',
      {
        corejs: '3.27',
        debug: isDebug,
        modules: false,
        targets,
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !isProductionEnvironment,
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
        onlyRemoveTypeImports: true,
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
