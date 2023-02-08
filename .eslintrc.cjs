module.exports = {
  extends: ['@repodog/eslint-config'],
  parserOptions: {
    project: ['./tsconfig.json', './cli/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
};
