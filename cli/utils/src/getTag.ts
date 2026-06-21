import { releaseTag } from '#constants.ts';

export const getTag = (version: string): string | undefined => {
  if (version.includes(releaseTag.ALPHA)) {
    return releaseTag.ALPHA;
  }

  if (version.includes(releaseTag.BETA)) {
    return releaseTag.BETA;
  }

  const regex = new RegExp(String.raw`(unstable(.*))\.\d+`);
  const matches = regex.exec(version);

  if (matches) {
    return matches[1];
  }

  return undefined;
};
