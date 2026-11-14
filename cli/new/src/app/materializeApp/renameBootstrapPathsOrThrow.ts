import { mkdir, rename } from 'node:fs/promises';
import { dirname } from 'node:path';
import { type BootstrapReplacement } from '../types.ts';
import { getValidBootstrapPathOrThrow } from './getValidBootstrapPathOrThrow.ts';
import { substituteBootstrapVariablesOrThrow } from './substituteBootstrapVariablesOrThrow.ts';

export const renameBootstrapPathsOrThrow = async (
  staged: string,
  renamePaths: BootstrapReplacement[],
  variables: Record<string, string>,
): Promise<void> => {
  for (const replacement of renamePaths) {
    const from = getValidBootstrapPathOrThrow(staged, replacement.from);
    const to = getValidBootstrapPathOrThrow(staged, substituteBootstrapVariablesOrThrow(replacement.to, variables));

    if (from !== to) {
      await mkdir(dirname(to), { recursive: true });
      await rename(from, to);
    }
  }
};
