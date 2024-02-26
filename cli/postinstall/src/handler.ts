import {
  type NewRepoSubtype,
  NewType,
  calculateDuration,
  getPackageManager,
  isValidNewSubType,
  isValidNewType,
  setVerbose,
  typeToSubTypeMap,
  verboseLog,
} from '@repodog/cli-utils';
import colors from 'ansi-colors';
import shelljs from 'shelljs';
import { type PostInstallHandlerArguments } from './types.ts';
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
    if (!isValidNewType(argv.type)) {
      throw new Error(`Expected type to be a valid new type: ${Object.values(NewType).join(', ')}`);
    }

    if (!isValidNewSubType(argv.type, argv.subtype)) {
      throw new Error(
        `Expected subtype to be a valid new subtype: ${Object.values(typeToSubTypeMap[argv.type]).join(', ')}`
      );
    }

    const subtype = argv.subtype as NewRepoSubtype;
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
      `${colors.magenta('Repodog')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`
    );

    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    return shelljs.exit(1);
  }
};
