import { type BootstrapManifest, type BootstrapOmission } from '../types.ts';

export const getApplicableOmissions = (
  manifest: BootstrapManifest,
  variables: Record<string, string>,
): BootstrapOmission[] =>
  Object.entries(manifest.whenMissing ?? {})
    .filter(([variable]) => !variables[variable]?.trim())
    .map(([, omission]) => omission);
