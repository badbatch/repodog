import { type Argv } from 'yargs';

export const builder = (argv: Argv) =>
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

export const command = 'publish';
export const desc = 'Publish packages to registry';
export { handler } from './handler.ts';
