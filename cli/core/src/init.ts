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
import yargs from 'yargs';
import packageJson from '../package.json';

export const init = () => {
  const skipNodeVersionCheck = (yargs.argv['skip-node-version-check'] ?? false) as boolean;
  const verbose = (yargs.argv.verbose ?? false) as boolean;
  setVerbose(verbose);
  verboseLog(`cli options:\n${JSON.stringify(yargs.argv, undefined, 2)}\n`);

  if (skipNodeVersionCheck || semver.satisfies(process.versions.node, packageJson.engines.node)) {
    verboseLog('Passed node version check, executing command.');

    // This pattern is required by yargs.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    yargs
      .command(cutCommand)
      .command(newCommand)
      .command(postinstallCommand)
      .command(publishCommand)
      .command(setupCommand)
      .command(writeCommand)
      .help().argv;
  } else {
    shelljs.echo(
      `${colors.magenta('Repodog')} ${colors.dim('=>')} ${colors.red(
        `Error: node version ${process.versions.node} does not satisfy package requirement of ${packageJson.engines.node}`,
      )}`,
    );

    shelljs.exit(1);
  }
};
