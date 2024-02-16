import { type Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv
    .option('skip-node-version-check', {
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
