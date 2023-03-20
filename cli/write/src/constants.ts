export const EXTRACT_CODE_REGEX = /```(?:js|ts|javascript|typescript)*\n([\S\s]*?)```/;
export const IMPORT_PATH_REGEX = /(import\(|from |jest.[A-Z_a-z]+?\()(["'])(\S*?)(["'])/g;
export const SINGLELINE_COMMENT_REGEX = /\s*\/\/[\S\s]*?\n/gm;
export const MULTILINE_COMMENT_REGEX = /\s*\/\*[\S\s]*?\*\//gm;
