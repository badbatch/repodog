import { PostInstallType } from '../types.ts';

export const isValidPostInstallType = (type: string): type is PostInstallType =>
  Object.values(PostInstallType).includes(type as PostInstallType);
