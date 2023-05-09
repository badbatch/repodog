import type { ReleaseType } from 'semver';

export const PRE_RELEASE_TYPES = ['premajor', 'preminor', 'prepatch', 'prerelease'];

export const isPreRelease = (releaseType: ReleaseType) => PRE_RELEASE_TYPES.includes(releaseType);
