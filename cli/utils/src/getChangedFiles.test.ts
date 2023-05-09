import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import type { ChildProcess } from 'node:child_process';

jest.unstable_mockModule('shelljs', shelljsMock);

describe('getChangedFiles', () => {
  describe('when there are cached changed files', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

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

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      const { addChangedFilesToCache, clearChangedFilesCache } = await import('./getChangedFiles.ts');
      clearChangedFilesCache();
      addChangedFilesToCache(cachedChangedFiles);
    });

    it('should return the cached changed files', async () => {
      const { getChangedFiles } = await import('./getChangedFiles.ts');
      expect(getChangedFiles('v1.1.0')).toEqual(cachedChangedFiles);
    });

    it('should not run the git diff command', async () => {
      const { getChangedFiles } = await import('./getChangedFiles.ts');
      getChangedFiles('v1.1.0');
      expect(shelljs.exec).not.toHaveBeenCalled();
    });
  });

  describe('when there are no cached changed files', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;
    const cachedChangedFiles = ['.editorconfig', '.gitignore', 'package.json', 'pnpm-lock.yaml'];

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;

      shelljs.exec.mockReturnValue({
        stdout: '.editorconfig\n.gitignore\npackage.json\npnpm-lock.yaml\n',
      } as unknown as ChildProcess);

      const { clearChangedFilesCache } = await import('./getChangedFiles.ts');
      clearChangedFilesCache();
    });

    it('should return the changed files', async () => {
      const { getChangedFiles } = await import('./getChangedFiles.ts');
      expect(getChangedFiles('v1.1.0')).toEqual(cachedChangedFiles);
    });

    it('should run the git diff command', async () => {
      const { getChangedFiles } = await import('./getChangedFiles.ts');
      getChangedFiles('v1.1.0');
      expect(shelljs.exec).toHaveBeenCalledWith('git diff --name-only HEAD v1.1.0', { silent: true });
    });

    it('should cache the changed files', async () => {
      const { getCachedChangedFiles, getChangedFiles } = await import('./getChangedFiles.ts');
      getChangedFiles('v1.1.0');
      expect(getCachedChangedFiles()).toEqual(cachedChangedFiles);
    });
  });
});
