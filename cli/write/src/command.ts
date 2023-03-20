import type { Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv
    .positional('type', {
      demandOption: true,
      desc: 'The write type: test',
      type: 'string',
    })
    .positional('filePath', {
      demandOption: true,
      desc: 'Path to file to execute write type against. Relative to cwd',
      type: 'string',
    })
    .option('skipFormat', {
      desc: 'Whether to skip formatting of the content of the new file',
      type: 'boolean',
    })
    .option('verbose', {
      desc: 'Whether to output verbose logs.',
      type: 'boolean',
    });

export const command = 'write <type> <filePath>';
export const desc = 'Write the content of a new file';
export { handler } from './handler.js';
