import { NewType } from './types.ts';

export const isValidNewType = (type: string): type is NewType => Object.values(NewType).includes(type as NewType);
