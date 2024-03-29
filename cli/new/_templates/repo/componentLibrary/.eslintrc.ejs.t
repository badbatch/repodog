---
to: .eslintrc.cjs
---
module.exports = {
  extends: ['@repodog/eslint-config', '@repodog/eslint-config-react', 'plugin:storybook/recommended'],
  overrides: [
    {
      extends: ['@repodog/eslint-config-jest'],
      files: ['**/*.{spec,test}.*'],
    },
  ],
  parserOptions: {
    project: ['./tsconfig.json', './<%= packagesDirName %>/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
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
};
