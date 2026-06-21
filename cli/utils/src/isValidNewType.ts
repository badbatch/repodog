import { newType } from '#constants.ts';
import { type NewType } from '#types.ts';

export const isValidNewType = (type: string): type is NewType => {
  // Needs to be list of strings for .includes not to throw type error
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const values = Object.values(newType) as string[];
  return values.includes(type);
};
