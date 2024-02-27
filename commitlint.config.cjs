const fs = require('node:fs');
const path = require('node:path');

const dirents = [
  ...fs.readdirSync(path.resolve(__dirname, './cli'), { withFileTypes: true }),
  ...fs.readdirSync(path.resolve(__dirname, './configs'), { withFileTypes: true }),
];

const directories = dirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

module.exports = {
  extends: ['@repodog/commitlint-config'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['repodog', ...directories]],
  },
};
