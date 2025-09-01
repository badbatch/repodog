import { type CommandBuilder } from 'yargs';
import { type NewHandlerArguments } from '#types.ts';

export const builder: CommandBuilder<NewHandlerArguments, NewHandlerArguments> = argv =>
  argv
    .positional('type', {
      demandOption: true,
      desc: 'The type of folder to scaffold: repo | pkg',
      type: 'string',
    })
    .positional('subtype', {
      demandOption: true,
      desc: 'The subtype of folder to scaffold; repo: componentLibrary | library | monorepo; pkg: component | config | library',
      type: 'string',
    })
    .positional('custom-type-path', {
      demandOption: false,
      desc: 'The additional types to apply to the scaffold. Multiple types should be separated by a "." character. These types are applied after the subtype',
      type: 'string',
    })
    .option('exclude-builtin-templates', {
      desc: 'To skip the node version check',
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

export const command = 'new <type> <subtype> [custom-type-path]';
export const desc = 'Scaffold new folder structure';
export { handler } from './handler.ts';
