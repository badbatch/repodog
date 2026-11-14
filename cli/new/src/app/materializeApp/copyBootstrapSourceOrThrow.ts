import { cp, lstat } from 'node:fs/promises';
import { relative } from 'node:path';
import { isExcludedPath } from './isExcludedPath.ts';

export const copyBootstrapSourceOrThrow = async (
  source: string,
  staged: string,
  excludedPaths: string[],
): Promise<void> => {
  await cp(source, staged, {
    filter: async path => {
      const pathFromRoot = relative(source, path);

      if (isExcludedPath(pathFromRoot, excludedPaths)) {
        return false;
      }

      const info = await lstat(path);

      if (info.isSymbolicLink()) {
        throw new Error(`Bootstrap sources cannot contain symbolic links: ${pathFromRoot}`);
      }

      return true;
    },
    recursive: true,
  });
};
