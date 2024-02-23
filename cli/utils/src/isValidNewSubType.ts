import { NewPkgSubtype, NewRepoSubtype, NewType } from './types.ts';

export const typeToSubTypeMap = {
  [NewType.PKG]: NewPkgSubtype,
  [NewType.REPO]: NewRepoSubtype,
};

export const isValidNewSubType = (type: NewType, subtype: string) =>
  Object.values(typeToSubTypeMap[type]).includes(subtype);
