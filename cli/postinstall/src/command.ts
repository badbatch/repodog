import type { Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv
    .positional('type', {
      demandOption: true,
      desc: 'The type of post install: repo | pkg',
      type: 'string',
    })
    .positional('subtype', {
      demandOption: true,
      desc: 'The subtype of post install: library',
      type: 'string',
    })
    .option('verbose', {
      desc: 'Whether to output verbose logs',
      type: 'boolean',
    });

export const command = 'postinstall <type> <subtype>';
export const desc = 'Run post install scripts for specific type/subtype combinations';
export { handler } from './handler.ts';
