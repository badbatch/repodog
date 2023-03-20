import { EXTRACT_CODE_REGEX } from '../constants.js';

export const extractCode = (rawAnswer: string) => EXTRACT_CODE_REGEX.exec(rawAnswer)?.[1]?.trimStart();
