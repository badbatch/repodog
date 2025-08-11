import { command as cutCommand } from '@repodog/cli-cut';
import { command as newCommand } from '@repodog/cli-new';
import { command as postinstallCommand } from '@repodog/cli-postinstall';
import { command as publishCommand } from '@repodog/cli-publish';
import { command as setupCommand } from '@repodog/cli-setup';
import { setVerbose, verboseLog } from '@repodog/cli-utils';
import { command as writeCommand } from '@repodog/cli-write';
import colors from 'ansi-colors';
import semver from 'semver';
import shelljs from 'shelljs';
import yargs, { type Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import packageJson from '../package.json' with { type: 'json' };

export const init = () => {
  // yargs does not provide a way to pass generic to type args.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const argv = yargs(hideBin(process.argv)) as Argv<{
    'skip-node-version-check'?: boolean;
    verbose?: boolean;
  }>;

  const cliOptions = argv.parseSync();
  const skipNodeVersionCheck = cliOptions['skip-node-version-check'] ?? false;
  const verbose = cliOptions.verbose ?? false;
  setVerbose(verbose);
  verboseLog(`cli options:\n${JSON.stringify(cliOptions, undefined, 2)}\n`);

  if (skipNodeVersionCheck || semver.satisfies(process.versions.node, packageJson.engines.node)) {
    verboseLog('Passed node version check, executing command.');

    void argv
      .command(cutCommand)
      .command(newCommand)
      .command(postinstallCommand)
      .command(publishCommand)
      .command(setupCommand)
      .command(writeCommand)
      .help()
      .parseAsync();
  } else {
    shelljs.echo(
      `${colors.magenta('Repodog')} ${colors.dim('=>')} ${colors.red(
        `Error: node version ${process.versions.node} does not satisfy package requirement of ${packageJson.engines.node}`,
      )}`,
    );

    shelljs.exit(1);
  }
};
