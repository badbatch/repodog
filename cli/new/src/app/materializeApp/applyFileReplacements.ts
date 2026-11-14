import { type BootstrapManifest } from '../types.ts';
import { applyReplacementsToFileOrThrow } from './applyReplacementsToFileOrThrow.ts';
import { isExcludedPath } from './isExcludedPath.ts';

export const applyFileReplacements = async (
  staged: string,
  manifest: BootstrapManifest,
  excludedPaths: string[],
  variables: Record<string, string>,
): Promise<void> => {
  for (const file of manifest.files) {
    if (isExcludedPath(file, excludedPaths)) {
      continue;
    }

    await applyReplacementsToFileOrThrow(staged, file, manifest.replacements, variables);
  }
};
