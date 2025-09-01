import shelljs from 'shelljs';

let lastReleaseTag: string | undefined;

export const addLastReleaseTagToCache = (releaseTag: string): void => {
  lastReleaseTag = releaseTag;
};

export const clearLastReleaseTagCache = (): void => {
  lastReleaseTag = undefined;
};

export const getCachedLastReleaseTag = (): string | undefined => {
  return lastReleaseTag;
};

export const getLastReleaseTag = (): string => {
  if (lastReleaseTag) {
    return lastReleaseTag;
  }

  lastReleaseTag = shelljs.exec('git describe --tags --abbrev=0', { silent: true }).stdout.trim();
  return lastReleaseTag;
};
