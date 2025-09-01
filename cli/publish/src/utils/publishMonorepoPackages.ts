import { type PackageManager, getMonorepoPackageMeta, verboseLog } from '@repodog/cli-utils';
import colors from 'ansi-colors';
import { parse, resolve } from 'node:path';
import shelljs from 'shelljs';
import { publishPackage } from './publishPackage.ts';

export const publishMonorepoPackages = async (packageManager: PackageManager): Promise<void> => {
  verboseLog('Publishing monorepo packages');
  verboseLog('>>>> PROJECT ROOT END <<<<\n');
  const packageMeta = getMonorepoPackageMeta(packageManager);
  const projectRoot = process.cwd();

  for (const name in packageMeta) {
    verboseLog('>>>> PACKAGE START <<<<');
    verboseLog(`Publishing package: ${name}`);

    try {
      // typescript struggling to derive packageMeta[name]
      // cannot be undefined.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        // catch arg has to be of type unknown, but in this context it will
        // always be of type Error.
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        `${colors.magenta('Repodog')} ${colors.dim('=>')} Error publishing ${name}: ${(error as Error).message}`,
      );

      verboseLog('>>>> PACKAGE END <<<<\n');
      throw error;
    }
  }
};
