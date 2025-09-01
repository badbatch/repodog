import { calculateDuration, setVerbose, verboseLog } from '@repodog/cli-utils';
import colors from 'ansi-colors';
import { performance } from 'node:perf_hooks';
import shelljs from 'shelljs';
import { type SetupHandlerArguments } from './types.ts';
import { handleGlobalConfigSetup } from './utils/handleGlobalConfigSetup.ts';

export const handler = async (argv: SetupHandlerArguments = {}): Promise<void> => {
  const startTime = performance.now();
  const verbose = argv.verbose ?? false;
  setVerbose(verbose);

  try {
    await handleGlobalConfigSetup();
    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    return shelljs.exit(0);
  } catch (error: unknown) {
    shelljs.echo(
      // catch arg has to be of type unknown, but in this context it will
      // always be of type Error.
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      `${colors.magenta('Repodog')} ${colors.dim('=>')} ${colors.red(`Error: ${(error as Error).message}`)}`,
    );

    verboseLog(`Handler duration: ${String(calculateDuration(startTime))}sec`);
    return shelljs.exit(1);
  }
};
