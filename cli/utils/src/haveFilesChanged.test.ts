import { jest } from '@jest/globals';

jest.unstable_mockModule('./getChangedFiles.ts', () => ({
  getChangedFiles: jest.fn().mockReturnValue([]),
}));

describe('haveFilesChanged', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the number of changed files is greater than 0', () => {
    beforeEach(async () => {
      const { getChangedFiles } = jest.mocked(await import('./getChangedFiles.ts'));
      getChangedFiles.mockReturnValueOnce(['.editorconfig', '.gitignore', 'package.json', 'pnpm-lock.yaml']);
    });

    it('should return true', async () => {
      const { haveFilesChanged } = await import('./haveFilesChanged.ts');
      expect(haveFilesChanged('v1.1.0')).toBe(true);
    });
  });

  describe('when the number of changed files is 0', () => {
    it('should return false', async () => {
      const { haveFilesChanged } = await import('./haveFilesChanged.ts');
      expect(haveFilesChanged('v1.1.0')).toBe(false);
    });
  });
});
