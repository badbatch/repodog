import { getPackageManager, isProjectMonorepo } from '@repodog/cli-utils';
import colors from 'ansi-colors';
import { resolve } from 'node:path';
import shelljs from 'shelljs';
import { publishMonorepoPackages } from './utils/publishMonorepoPackages.js';
import { publishPackage } from './utils/publishPackage.js';

export const handler = () => {
  try {
    const packageManager = getPackageManager();

    if (!packageManager) {
      throw new Error('Could not derive the package manager from the lock file in the current working directory');
    }

    if (isProjectMonorepo(packageManager)) {
      publishMonorepoPackages(packageManager);
    } else {
      const packageJsonPath = resolve(process.cwd(), 'package.json');
      publishPackage(packageJsonPath, { packageManager });
    }

    return shelljs.exit(0);
  } catch (error: unknown) {
    shelljs.echo(`${colors.magenta('Cutoff')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`);
    return shelljs.exit(1);
  }
};
