import type { Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv.option('verbose', {
    desc: 'Whether to output verbose logs.',
    type: 'boolean',
  });

export const command = 'setup';
export const desc = 'Set up global config';
export { handler } from './handler.ts';
