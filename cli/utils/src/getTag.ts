import { releaseTags } from '#constants.ts';

export const getTag = (version: string): string | undefined => {
  if (version.includes(releaseTags.ALPHA)) {
    return releaseTags.ALPHA;
  }

  if (version.includes(releaseTags.BETA)) {
    return releaseTags.BETA;
  }

  const matches = new RegExp(String.raw`(unstable(.*))\.\d+`).exec(version);

  if (matches) {
    return matches[1];
  }

  return undefined;
};
