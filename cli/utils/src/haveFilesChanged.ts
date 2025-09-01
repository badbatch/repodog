import { getChangedFiles } from './getChangedFiles.ts';

export const haveFilesChanged = (releaseTag: string): boolean => getChangedFiles(releaseTag).length > 0;
