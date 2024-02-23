import { type NewRepoSubtype, type NewType } from '@repodog/cli-utils';
import { installRepoDogPeerDependencies } from './installRepoDogPeerDependencies.ts';

export const runCommonPostInstallTasks = async (_type: NewType, _subtype: NewRepoSubtype) =>
  Promise.all([installRepoDogPeerDependencies()]);
