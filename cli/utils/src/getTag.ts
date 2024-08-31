import { ReleaseTag } from './types.ts';

export const getTag = (version: string): string | undefined => {
  if (version.includes(ReleaseTag.ALPHA)) {
    return ReleaseTag.ALPHA;
  }

  if (version.includes(ReleaseTag.BETA)) {
    return ReleaseTag.BETA;
  }

  const matches = new RegExp(String.raw`(unstable(.*))\.\d+`).exec(version);

  if (matches) {
    return matches[1];
  }

  return undefined;
};
