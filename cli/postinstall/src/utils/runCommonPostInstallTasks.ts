import { type PostInstallSubType, type PostInstallType } from '../types.ts';
import { installRepoDogPeerDependencies } from './installRepoDogPeerDependencies.ts';

export const runCommonPostInstallTasks = async (_type: PostInstallType, _subtype: PostInstallSubType) =>
  Promise.all([installRepoDogPeerDependencies()]);
