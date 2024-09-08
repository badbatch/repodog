import config from '@repodog/eslint-config';
import jestConfig from '@repodog/eslint-config-jest';

// eslint convention is to export default
// eslint-disable-next-line import-x/no-default-export
export default [
  ...config,
  ...jestConfig.map(entry => ({
    ...entry,
    files: ['**/*.{spec,test}.*'],
  })),
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './cli/*/tsconfig.json'],
      },
    },
    rules: {
      // disabled devDependencies due to https://github.com/import-js/eslint-plugin-import/issues/2168
      'import/no-extraneous-dependencies': [
        2,
        {
          devDependencies: true,
          peerDependencies: false,
        },
      ],
    },
  },
];
