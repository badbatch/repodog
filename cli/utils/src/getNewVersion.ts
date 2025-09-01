import semver, { type ReleaseType } from 'semver';
import { type ReleaseTag } from './types.ts';

export const getNewVersion = (
  version: string,
  type: ReleaseType,
  tag?: ReleaseTag,
  preid?: string,
): string | undefined => {
  return semver.inc(version, type, tag && preid ? `${tag}-${preid}` : tag, '0') ?? undefined;
};
