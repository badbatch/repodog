import repodogConfig from '@repodog/babel-config';

const babelConfig = api => ({
  ...repodogConfig(api),
});

// Required for Babel
// eslint-disable-next-line import-x/no-default-export
export default babelConfig;
