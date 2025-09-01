import shelljs from 'shelljs';

let cachedChangedFiles: string[] | undefined;

export const addChangedFilesToCache = (files: string[]): void => {
  cachedChangedFiles = [...(cachedChangedFiles ?? []), ...files];
};

export const clearChangedFilesCache = (): void => {
  cachedChangedFiles = undefined;
};

export const getCachedChangedFiles = (): string[] | undefined => cachedChangedFiles;

export const getChangedFiles = (releaseTag: string): string[] => {
  if (cachedChangedFiles) {
    return cachedChangedFiles;
  }

  cachedChangedFiles = shelljs
    .exec(`git diff --name-only HEAD ${releaseTag}`, { silent: true })
    .stdout.trim()
    .split('\n')
    .filter(value => !!value);

  return cachedChangedFiles;
};
