import { type PackageManager, getMonorepoPackageMeta } from '@repodog/cli-utils';
import colors from 'ansi-colors';
import shelljs from 'shelljs';
import { publishPackage } from './publishPackage.js';

export const publishMonorepoPackages = (packageManager: PackageManager) => {
  const packageMeta = getMonorepoPackageMeta(packageManager);

  for (const name in packageMeta) {
    try {
      const { path } = packageMeta[name]!;
      publishPackage(path, { packageManager });
    } catch (error: unknown) {
      shelljs.echo(
        `${colors.magenta('Cutoff')} ${colors.dim('=>')} Error publishing ${name}: ${(error as Error).message}`
      );
    }
  }
};
