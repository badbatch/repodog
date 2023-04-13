---
to: <%= path %>/src/command.ts
---
import type { Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv.option('verbose', {
    desc: 'Whether to output verbose logs.',
    type: 'boolean',
  });

export const command = '<%- cliCommand %>';
export const desc = '<%= cliDescription %>';
export { handler } from './handler.ts';
