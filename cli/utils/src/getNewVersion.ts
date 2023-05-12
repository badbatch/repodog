import semver, { type ReleaseType } from 'semver';
import type { ReleaseTag } from './types.ts';

export const getNewVersion = (version: string, type: ReleaseType, tag?: ReleaseTag) => {
  return semver.inc(version, type, false, tag);
};
