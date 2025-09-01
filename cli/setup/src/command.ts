import { type CommandBuilder } from 'yargs';
import { type SetupHandlerArguments } from '#types.ts';

export const builder: CommandBuilder<SetupHandlerArguments, SetupHandlerArguments> = argv =>
  argv
    .option('skip-node-version-check', {
      alias: 'snvc',
      desc: 'To skip the node version check',
      type: 'boolean',
    })
    .option('verbose', {
      desc: 'Whether to output verbose logs',
      type: 'boolean',
    });

export const command = 'setup';
export const desc = 'Set up global config';
export { handler } from './handler.ts';
