import { fileURLToPath } from 'node:url';

const resolvePath = name => fileURLToPath(import.meta.resolve(name));

const config = api => {
  const { BABEL_DISABLE_CACHE, JS_ENV, NODE_ENV } = process.env;

  if (BABEL_DISABLE_CACHE === 'true') {
    api.cache.never();
  } else {
    api.cache.using(() => JS_ENV);
  }

  const isTestEnv = NODE_ENV === 'test';
  const ignore = ['node_modules/**', '**/node_modules/**'];

  if (!isTestEnv) {
    ignore.push('**/*.spec.*', '**/*.test.*', '**/__testUtils__/**', '**/__tests__/**', '**/__mocks__/**');
  }

  return {
    ignore,
    presets: [resolvePath('@repodog/babel-preset')],
  };
};

// Required for Babel
// eslint-disable-next-line import-x/no-default-export
export default config;
