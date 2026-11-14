import { type BootstrapManifest, type BootstrapOmission } from '../types.ts';
import { getValidBootstrapPathOrThrow } from './getValidBootstrapPathOrThrow.ts';

export const getValidExcludedPathsOrThrow = (
  source: string,
  manifest: BootstrapManifest,
  omissions: BootstrapOmission[],
): string[] => {
  const excludedPaths = [
    '.git',
    '.repodog-bootstrap.json',
    ...manifest.exclude,
    ...omissions.flatMap(omission => omission.exclude),
  ];

  // Validate exclusion paths stay inside the source directory; the resolved paths are not needed here.
  for (const path of excludedPaths) {
    getValidBootstrapPathOrThrow(source, path);
  }

  return excludedPaths;
};
