import semver, { type ReleaseType } from 'semver';
import type { PreReleaseId, ReleaseTag } from './types.ts';

export const getNewVersion = (version: string, type: ReleaseType, tag?: ReleaseTag, preReleaseId?: PreReleaseId) => {
  let semverTag: string | undefined = tag;

  if (semverTag && preReleaseId) {
    semverTag += `.${preReleaseId}`;
  }

  return semver.inc(version, type, false, semverTag);
};
