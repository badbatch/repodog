import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { type BootstrapOrigin } from '../types.ts';
import { applyConditionalReplacements } from './applyConditionalReplacements.ts';
import { applyFileReplacements } from './applyFileReplacements.ts';
import { copyBootstrapSourceOrThrow } from './copyBootstrapSourceOrThrow.ts';
import { copyToNewDestinationOrThrow } from './copyToNewDestinationOrThrow.ts';
import { getApplicableOmissions } from './getApplicableOmissions.ts';
import { getValidExcludedPathsOrThrow } from './getValidExcludedPathsOrThrow.ts';
import { loadValidBootstrapManifestOrThrow } from './loadValidBootstrapManifestOrThrow.ts';
import { renameBootstrapPathsOrThrow } from './renameBootstrapPathsOrThrow.ts';
import { writeBootstrapOrigin } from './writeBootstrapOrigin.ts';

export const materializeApp = async (
  source: string,
  destination: string,
  variables: Record<string, string>,
  origin: BootstrapOrigin,
): Promise<void> => {
  const manifest = await loadValidBootstrapManifestOrThrow(source);
  const temporary = await mkdtemp(resolve(tmpdir(), 'repodog-app-'));
  const staged = resolve(temporary, 'app');

  try {
    const omissions = getApplicableOmissions(manifest, variables);
    const excludedPaths = getValidExcludedPathsOrThrow(source, manifest, omissions);

    await copyBootstrapSourceOrThrow(source, staged, excludedPaths);
    await applyConditionalReplacements(staged, omissions, variables);
    await applyFileReplacements(staged, manifest, excludedPaths, variables);
    await renameBootstrapPathsOrThrow(staged, manifest.renamePaths, variables);
    await writeBootstrapOrigin(staged, origin);
    await copyToNewDestinationOrThrow(staged, destination);
  } finally {
    await rm(temporary, { force: true, recursive: true });
  }
};
