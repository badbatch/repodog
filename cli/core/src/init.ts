import { command as cutCommand } from '@repodog/cli-cut';
import { command as newCommand } from '@repodog/cli-new';
import { command as publishCommand } from '@repodog/cli-publish';
import { command as setupCommand } from '@repodog/cli-setup';
import { command as writeCommand } from '@repodog/cli-write';
import yargs from 'yargs';

export const init = () => {
  yargs
    .command(cutCommand)
    .command(newCommand)
    .command(publishCommand)
    .command(setupCommand)
    .command(writeCommand)
    .help().argv;
};
