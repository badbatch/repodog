import { command as cutCommand } from '@repodog/cli-cut';
import { command as publishCommand } from '@repodog/cli-publish';
import yargs from 'yargs';

export const init = () => {
  yargs.command(cutCommand).command(publishCommand).help().argv;
};
