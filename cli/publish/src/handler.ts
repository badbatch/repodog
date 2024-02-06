import { calculateDuration, getPackageManager, isProjectMonorepo, setVerbose, verboseLog } from '@repodog/cli-utils';
import colors from 'ansi-colors';
import { resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import shelljs from 'shelljs';
import { type PublishHandlerArguments } from './types.ts';
import { publishMonorepoPackages } from './utils/publishMonorepoPackages.ts';
import { publishPackage } from './utils/publishPackage.ts';

export const handler = (argv: PublishHandlerArguments = {}) => {
  const startTime = performance.now();
  const verbose = argv.verbose ?? false;

  setVerbose(verbose);

  try {
    const packageManager = getPackageManager();

    if (!packageManager) {
      throw new Error('Could not derive the package manager from the lock file in the current working directory');
    }

    verboseLog('>>>> DERIVED VALUES START <<<<');
    verboseLog(`Package manager: ${packageManager}`);
    verboseLog('>>>> DERIVED VALUES END <<<<\n');
    verboseLog('>>>> PROJECT ROOT START <<<<');

    if (isProjectMonorepo(packageManager)) {
      verboseLog('Project is monorepo');
      publishMonorepoPackages(packageManager);
      verboseLog('>>>> PROJECT ROOT STARTS <<<<\n');
    } else {
      verboseLog('Project is standard repo structure');
      const packageJsonPath = resolve(process.cwd(), 'package.json');
      publishPackage(packageJsonPath, { packageManager });
    }

    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    verboseLog('>>>> PROJECT ROOT END <<<<\n');
    return shelljs.exit(0);
  } catch (error: unknown) {
    shelljs.echo(
      `${colors.magenta('RepoDog')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`
    );

    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    verboseLog('>>>> PROJECT ROOT END <<<<\n');
    return shelljs.exit(1);
  }
};
