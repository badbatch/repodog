import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

export const conditionallyChangeCwd = (name: string) => {
  const cwd = process.cwd();

  if (!cwd.endsWith(name)) {
    const targetDirectory = resolve(cwd, name);

    if (!existsSync(targetDirectory)) {
      mkdirSync(targetDirectory);
    }

    process.chdir(targetDirectory);
  }
};
