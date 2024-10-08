import { type PackageManager, getMonorepoPackageMeta, verboseLog } from '@repodog/cli-utils';
import colors from 'ansi-colors';
import { parse, resolve } from 'node:path';
import shelljs from 'shelljs';
import { publishPackage } from './publishPackage.ts';

export const publishMonorepoPackages = async (packageManager: PackageManager) => {
  verboseLog('Publishing monorepo packages');
  verboseLog('>>>> PROJECT ROOT END <<<<\n');
  const packageMeta = getMonorepoPackageMeta(packageManager);
  const projectRoot = process.cwd();

  for (const name in packageMeta) {
    verboseLog('>>>> PACKAGE START <<<<');
    verboseLog(`Publishing package: ${name}`);

    try {
      const { path } = packageMeta[name]!;
      const { dir } = parse(path);

      await publishPackage(path, { packageManager }, () => {
        verboseLog(`Changing current working directory to: ${dir}`);
        process.chdir(resolve(projectRoot, dir));
      });

      verboseLog('>>>> PACKAGE END <<<<\n');
      verboseLog(`Changing current working directory back to: ${projectRoot}`);
      process.chdir(projectRoot);
    } catch (error: unknown) {
      shelljs.echo(
        `${colors.magenta('Repodog')} ${colors.dim('=>')} Error publishing ${name}: ${(error as Error).message}`,
      );

      verboseLog('>>>> PACKAGE END <<<<\n');
      throw error;
    }
  }
};
