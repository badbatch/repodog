import { getChangedFiles } from './getChangedFiles.ts';

export const haveFilesChanged = (releaseTag: string) => getChangedFiles(releaseTag).length > 0;
