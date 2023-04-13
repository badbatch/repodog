import type { NewType } from '../types.ts';

export const VALID_NEW_TYPES = ['pkg', 'repo'];

export const isValidNewType = (type: string): type is NewType => VALID_NEW_TYPES.includes(type);
