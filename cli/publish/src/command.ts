import type { Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv.option('verbose', {
    desc: 'Whether to output verbose logs',
    type: 'boolean',
  });

export const command = 'publish';
export const desc = 'Publish packages to registry';
export { handler } from './handler.js';
