import config from '@repodog/eslint-config';

// eslint convention is to export default
// eslint-disable-next-line import/no-default-export
export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './cli/*/tsconfig.json'],
      },
    },
  },
];
