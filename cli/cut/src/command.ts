import { type Argv } from 'yargs';

export const builder = (argv: Argv) =>
  argv
    .positional('type', {
      demandOption: true,
      desc: 'The release type: major | premajor | minor | preminor | patch | prepatch | prerelease | dry-run',
      type: 'string',
    })
    .option('tag', {
      desc: 'The release tag: alpha | beta | pr | unstable',
      type: 'string',
    })
    .option('preid', {
      desc: 'A unique identifier for the pre-release',
      type: 'string',
    })
    .option('dry-run', {
      desc: 'Stop job before versioning changes are committed',
      type: 'boolean',
    })
    .option('filter', {
      desc: 'A glob for filtering the packages the command is run against',
      type: 'string',
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
    .option('skip-node-version-check', {
      desc: 'To skip the node version check',
      type: 'boolean',
    })
    .option('verbose', {
      desc: 'Whether to output verbose logs',
      type: 'boolean',
    });

export const command = 'cut <type>';
export const desc = 'Cut release to current branch';
export { handler } from './handler.ts';
