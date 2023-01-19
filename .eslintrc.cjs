module.exports = {
  extends: ['@repodog/eslint-config'],
  parserOptions: {
    project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
};
