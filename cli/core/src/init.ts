import { command as cutCommand } from '@repodog/cli-cut';
import { command as newCommand } from '@repodog/cli-new';
import { command as postinstallCommand } from '@repodog/cli-postinstall';
import { command as publishCommand } from '@repodog/cli-publish';
import { command as setupCommand } from '@repodog/cli-setup';
import { command as writeCommand } from '@repodog/cli-write';
import colors from 'ansi-colors';
import semver from 'semver';
import shelljs from 'shelljs';
import yargs from 'yargs';
import packageJson from '../package.json';

export const init = () => {
  if (semver.satisfies(process.versions.node, packageJson.engines.node)) {
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
      `${colors.magenta('RepoDog')} ${colors.dim('=>')} ${colors.red(
        `Error: node version ${process.versions.node} does not satisfy package requirement of ${packageJson.engines.node}`
      )}`
    );

    shelljs.exit(1);
  }
};
