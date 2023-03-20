import { IMPORT_PATH_REGEX } from '../constants.js';

export const injectFileExtension = (code: string) =>
  code.replaceAll(IMPORT_PATH_REGEX, (match, p1: string, p2: string, p3: string, p4: string) => {
    if (p3.startsWith('.') && !/\.[a-z]{2,4}/.test(p3)) {
      return `${p1}${p2}${p3}.js${p4}`;
    }

    return match;
  });
