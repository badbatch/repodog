import type { Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv
    .positional('type', {
      demandOption: true,
      desc: 'The type of folder to scaffold: repo | pkg',
      type: 'string',
    })
    .option('subtypes', {
      desc: 'The sub types to apply to the scaffold. Multiple types should be separated by a "." character',
      type: 'string',
    })
    .option('verbose', {
      desc: 'Whether to output verbose logs.',
      type: 'boolean',
    });

export const command = 'new <type>';
export const desc = 'Scaffold new folder structure';
export { handler } from './handler.js';
