import { type WriteType } from '../types.ts';

export const VALID_WRITE_TYPES = ['test'];

export const isValidWriteType = (type: string): type is WriteType => VALID_WRITE_TYPES.includes(type);
