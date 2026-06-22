import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const dirents = [
  ...fs.readdirSync(path.resolve(dirname, './cli'), { withFileTypes: true }),
  ...fs.readdirSync(path.resolve(dirname, './configs'), { withFileTypes: true }),
];

const directories = dirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

// Required for CommitLint
// eslint-disable-next-line import-x/no-default-export
export default {
  extends: ['@repodog/commitlint-config'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['root', ...directories]],
  },
};
