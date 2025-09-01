import { loadPackageJson } from '@repodog/cli-utils';
import { resolve } from 'node:path';

export const getRepoDogDevDependencyNames = (): string[] => {
  const packageJson = loadPackageJson(resolve(process.cwd()));
  const names: string[] = [];

  for (const name in packageJson.devDependencies) {
    if (name.startsWith('@repodog/')) {
      names.push(name);
    }
  }

  return names;
};
