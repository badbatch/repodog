import { PostInstallSubType } from '../types.ts';

export const isValidPostInstallSubType = (subtype: string): subtype is PostInstallSubType =>
  Object.values(PostInstallSubType).includes(subtype as PostInstallSubType);
