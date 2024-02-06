import { type Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv
    .positional('type', {
      demandOption: true,
      desc: 'The release type: major | premajor | minor | preminor | patch | prepatch | prerelease | dry-run',
      type: 'string',
    })
    .option('tag', {
      desc: 'The release tag: alpha | beta | unstable',
      type: 'string',
    })
    .option('dry-run', {
      desc: 'The release tag: alpha | beta | unstable',
      type: 'boolean',
    })
    .option('force', {
      desc: 'Increment version regardless of files changed',
      type: 'boolean',
    })
    .option('skip-posthook', {
      desc: 'To skip post version lifecycle hook',
      type: 'boolean',
    })
    .option('skip-prehook', {
      desc: 'To skip pre version lifecycle hook',
      type: 'boolean',
    })
    .option('verbose', {
      desc: 'Whether to output verbose logs',
      type: 'boolean',
    });

export const command = 'cut <type>';
export const desc = 'Cut release to current branch';
export { handler } from './handler.ts';
