import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import { type ChildProcess } from 'node:child_process';

jest.unstable_mockModule('shelljs', shelljsMock);
const shelljs = jest.mocked(await import('shelljs')).default;

const { addChangedFilesToCache, clearChangedFilesCache, getCachedChangedFiles, getChangedFiles } = await import(
  './getChangedFiles.ts'
);

describe('getChangedFiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when there are cached changed files', () => {
    const cachedChangedFiles = [
      '.editorconfig',
      '.gitignore',
      'package.json',
      'pnpm-lock.yaml',
      'src/cmds/cut.test.ts',
      'src/cmds/cut.ts',
      'src/cmds/publish.test.ts',
      'src/cmds/publish.ts',
      'src/cut-release/index.test.ts',
      'src/cut-release/index.ts',
      'src/handlers/cut.test.ts',
      'src/handlers/cut.ts',
      'src/handlers/publish.test.ts',
      'src/handlers/publish.ts',
    ];

    beforeEach(() => {
      clearChangedFilesCache();
      addChangedFilesToCache(cachedChangedFiles);
    });

    it('should return the cached changed files', () => {
      expect(getChangedFiles('v1.1.0')).toEqual(cachedChangedFiles);
    });

    it('should not run the git diff command', () => {
      getChangedFiles('v1.1.0');
      expect(shelljs.exec).not.toHaveBeenCalled();
    });
  });

  describe('when there are no cached changed files', () => {
    const cachedChangedFiles = ['.editorconfig', '.gitignore', 'package.json', 'pnpm-lock.yaml'];

    beforeEach(() => {
      shelljs.exec.mockReturnValue({
        stdout: '.editorconfig\n.gitignore\npackage.json\npnpm-lock.yaml\n',
      } as unknown as ChildProcess);

      clearChangedFilesCache();
    });

    it('should return the changed files', () => {
      expect(getChangedFiles('v1.1.0')).toEqual(cachedChangedFiles);
    });

    it('should run the git diff command', () => {
      getChangedFiles('v1.1.0');
      expect(shelljs.exec).toHaveBeenCalledWith('git diff --name-only HEAD v1.1.0', { silent: true });
    });

    it('should cache the changed files', () => {
      getChangedFiles('v1.1.0');
      expect(getCachedChangedFiles()).toEqual(cachedChangedFiles);
    });
  });
});
