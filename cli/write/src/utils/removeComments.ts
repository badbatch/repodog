import { MULTILINE_COMMENT_REGEX, SINGLELINE_COMMENT_REGEX } from '../constants.ts';

export const removeComments = (code: string) =>
  code.replaceAll(SINGLELINE_COMMENT_REGEX, () => '\n').replaceAll(MULTILINE_COMMENT_REGEX, () => '');
