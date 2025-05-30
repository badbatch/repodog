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
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    [require.resolve('@babel/plugin-syntax-import-attributes'), { deprecatedAssertSyntax: true }],
    require.resolve('babel-plugin-codegen'),
    require.resolve('babel-plugin-macros'),
  ];

  const presets = [
    [
      require.resolve('@babel/preset-env'),
      {
        corejs: '3.38.0',
        debug: isDebug,
        modules: isCjs ? 'commonjs' : false,
        targets,
        useBuiltIns: 'usage',
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

module.exports = config;
