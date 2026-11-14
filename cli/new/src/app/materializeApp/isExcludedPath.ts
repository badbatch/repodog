import { sep } from 'node:path';

export const isExcludedPath = (path: string, excludedPaths: string[]): boolean =>
  excludedPaths.some(entry => path === entry || path.startsWith(`${entry}${sep}`));
