import { type NewRepoSubtype, type NewType } from '@repodog/cli-utils';
import { installRepoDogPeerDependencies } from './installRepoDogPeerDependencies.ts';

export const runCommonPostInstallTasks = async (_type: NewType, _subtype: NewRepoSubtype) =>
  // Left like this as the plan is to add more tasks
  // to the array in the future.
  // eslint-disable-next-line unicorn/no-single-promise-in-promise-methods
  Promise.all([installRepoDogPeerDependencies()]);
