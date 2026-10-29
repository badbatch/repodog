import { releaseTag } from '#constants.ts';

const alphaRegex = /-alpha(?:\.|$)/;
const betaRegex = /-beta(?:\.|$)/;
const pullRequestRegex = /-pr-(\d+)(?:\.\d+)*$/;
const unstableRegex = /-unstable(.*)\.\d+$/;

export const getTag = (version: string): string | undefined => {
  if (alphaRegex.test(version)) {
    return releaseTag.ALPHA;
  }

  if (betaRegex.test(version)) {
    return releaseTag.BETA;
  }

  const pullRequestMatches = pullRequestRegex.exec(version);

  if (pullRequestMatches) {
    return `${releaseTag.PULL_REQUEST}-${String(pullRequestMatches[1])}`;
  }

  const unstableMatches = unstableRegex.exec(version);

  if (unstableMatches) {
    return `${releaseTag.UNSTABLE}${String(unstableMatches[1])}`;
  }

  return undefined;
};
