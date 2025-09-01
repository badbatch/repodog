import { type CommandBuilder } from 'yargs';
import { type WriteHandlerArguments } from '#types.ts';

export const builder: CommandBuilder<WriteHandlerArguments, WriteHandlerArguments> = argv =>
  argv
    .positional('type', {
      demandOption: true,
      desc: 'The write type: test',
      type: 'string',
    })
    .positional('file-path', {
      demandOption: true,
      desc: 'Path to file to execute write type against. Relative to cwd',
      type: 'string',
    })
    .option('skip-format', {
      desc: 'Whether to skip formatting of the content of the new file',
      type: 'boolean',
    })
    .option('skip-node-version-check', {
      alias: 'snvc',
      desc: 'To skip the node version check',
      type: 'boolean',
    })
    .option('verbose', {
      desc: 'Whether to output verbose logs',
      type: 'boolean',
    });

export const command = 'write <type> <file-path>';
export const desc = 'Write the content of a new file';
export { handler } from './handler.ts';
