import { EXTRACT_CODE_REGEX } from '../constants.ts';

export const extractCode = (rawAnswer: string) => EXTRACT_CODE_REGEX.exec(rawAnswer)?.[1]?.trimStart();
