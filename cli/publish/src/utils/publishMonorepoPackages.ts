import { type PackageManager, getMonorepoPackageMeta, verboseLog } from '@repodog/cli-utils';
import colors from 'ansi-colors';
import shelljs from 'shelljs';
import { publishPackage } from './publishPackage.js';

export const publishMonorepoPackages = (packageManager: PackageManager) => {
  verboseLog('Publishing monorepo packages');
  verboseLog('>>>> PROJECT ROOT END <<<<\n');
  const packageMeta = getMonorepoPackageMeta(packageManager);

  for (const name in packageMeta) {
    verboseLog('>>>> PACKAGE START <<<<');
    verboseLog(`Publishing package: ${name}`);

    try {
      const { path } = packageMeta[name]!;
      publishPackage(path, { packageManager });
      verboseLog('>>>> PACKAGE END <<<<\n');
    } catch (error: unknown) {
      shelljs.echo(
        `${colors.magenta('Cutoff')} ${colors.dim('=>')} Error publishing ${name}: ${(error as Error).message}`
      );

      verboseLog('>>>> PACKAGE END <<<<\n');
    }
  }
};
