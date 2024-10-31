import { NewType } from './types.ts';

// enum and string value are not the same type, even if values match.
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const isValidNewType = (type: string): type is NewType => Object.values(NewType).includes(type as NewType);
