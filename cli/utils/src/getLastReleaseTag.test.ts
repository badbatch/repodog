import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import { type ChildProcess } from 'node:child_process';

jest.unstable_mockModule('shelljs', shelljsMock);
const shelljs = jest.mocked(await import('shelljs')).default;

const { addLastReleaseTagToCache, clearLastReleaseTagCache, getCachedLastReleaseTag, getLastReleaseTag } = await import(
  './getLastReleaseTag.ts'
);

describe('getLastReleaseTag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when there are cached changed files', () => {
    beforeEach(() => {
      clearLastReleaseTagCache();
      addLastReleaseTagToCache('v1.1.0');
    });

    it('should return the cached last release tag', () => {
      expect(getLastReleaseTag()).toBe('v1.1.0');
    });

    it('should not run the git describe command', () => {
      getLastReleaseTag();
      expect(shelljs.exec).not.toHaveBeenCalled();
    });
  });

  describe('when there are no cached changed files', () => {
    beforeEach(() => {
      shelljs.exec.mockReturnValue({
        stdout: 'v1.2.0',
      } as unknown as ChildProcess);

      clearLastReleaseTagCache();
    });

    it('should return the last release tag', () => {
      expect(getLastReleaseTag()).toBe('v1.2.0');
    });

    it('should run the git describe command', () => {
      getLastReleaseTag();
      expect(shelljs.exec).toHaveBeenCalledWith('git describe --tags --abbrev=0', { silent: true });
    });

    it('should cache the last release tag', () => {
      getLastReleaseTag();
      expect(getCachedLastReleaseTag()).toBe('v1.2.0');
    });
  });
});
