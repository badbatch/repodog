import { calculateDuration, getPackageManager, setVerbose, verboseLog } from '@repodog/cli-utils';
import colors from 'ansi-colors';
import shelljs from 'shelljs';
import { type PostInstallHandlerArguments, PostInstallSubType, PostInstallType } from './types.ts';
import { isValidPostInstallSubType } from './utils/isValidPostInstallSubType.ts';
import { isValidPostInstallType } from './utils/isValidPostInstallType.ts';
import { runCommonPostInstallTasks } from './utils/runCommonPostInstallTasks.ts';

export const handler = async (argv: PostInstallHandlerArguments) => {
  const startTime = performance.now();
  const verbose = argv.verbose ?? false;

  setVerbose(verbose);
  verboseLog('>>>> USER CONFIG START <<<<');
  verboseLog(`subtype: ${argv.subtype}`);
  verboseLog(`type: ${argv.type}`);
  verboseLog('>>>> USER CONFIG END <<<<\n');

  try {
    if (!isValidPostInstallType(argv.type)) {
      throw new Error(`Expected type to be a valid postinstall type: ${Object.values(PostInstallType).join(', ')}`);
    }

    if (!isValidPostInstallSubType(argv.subtype)) {
      throw new Error(
        `Expected subtype to be a valid postinstall subtype: ${Object.values(PostInstallSubType).join(', ')}`
      );
    }

    const subtype = argv.subtype;
    const type = argv.type;
    const packageManager = getPackageManager();

    if (!packageManager) {
      throw new Error('Could not derive the package manager');
    }

    await runCommonPostInstallTasks(type, subtype);
    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    return shelljs.exit(0);
  } catch (error: unknown) {
    shelljs.echo(
      `${colors.magenta('RepoDog')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`
    );

    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    return shelljs.exit(1);
  }
};
