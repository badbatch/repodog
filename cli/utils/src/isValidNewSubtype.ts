import { newPackageSubtype, newRepoSubtype, newType } from '#constants.ts';
import { type NewType } from '#types.ts';

export const typeToSubtypeMap = {
  [newType.PKG]: newPackageSubtype,
  [newType.REPO]: newRepoSubtype,
};

export const isValidNewSubtype: (type: NewType, subtype: string) => boolean = (
  type: NewType,
  subtype: string,
): boolean => {
  // Needs to be list of strings for .includes not to throw type error
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const values = Object.values(typeToSubtypeMap[type]) as unknown as string[];
  return values.includes(subtype);
};
