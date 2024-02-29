import { type ReleaseTag } from './types.ts';

export const VALID_RELEASE_TAGS = ['alpha', 'beta', 'pr', 'unstable'];

export const isValidReleaseTag = (tag: string): tag is ReleaseTag => {
  return VALID_RELEASE_TAGS.includes(tag);
};
