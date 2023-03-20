import { MULTILINE_COMMENT_REGEX, SINGLELINE_COMMENT_REGEX } from '../constants.js';

export const removeComments = (code: string) =>
  code.replaceAll(SINGLELINE_COMMENT_REGEX, () => '\n').replaceAll(MULTILINE_COMMENT_REGEX, () => '');
