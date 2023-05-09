import type { Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv
    .positional('type', {
      demandOption: true,
      desc: 'The type of folder to scaffold: repo | pkg',
      type: 'string',
    })
    .positional('subtype', {
      demandOption: false,
      desc: 'The subtype of folder to scaffold. Only relevant when type is "repo": app | library | server',
      type: 'string',
    })
    .option('custom-type-path', {
      desc: 'The additional types to apply to the scaffold. Multiple types should be separated by a "." character. These types are applied after the subtype',
      type: 'string',
    })
    .option('verbose', {
      desc: 'Whether to output verbose logs',
      type: 'boolean',
    });

export const command = 'new <type> [subtype]';
export const desc = 'Scaffold new folder structure';
export { handler } from './handler.ts';
