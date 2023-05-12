import { NewSubtype } from '../types.ts';

export const isValidNewSubType = (subtype: string): subtype is NewSubtype =>
  Object.values(NewSubtype).includes(subtype as NewSubtype);
