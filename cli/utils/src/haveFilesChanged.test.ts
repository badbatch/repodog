import { jest } from '@jest/globals';

jest.unstable_mockModule('./getChangedFiles.ts', () => ({
  getChangedFiles: jest.fn().mockReturnValue([]),
}));

const { getChangedFiles } = jest.mocked(await import('./getChangedFiles.ts'));
const { haveFilesChanged } = await import('./haveFilesChanged.ts');

describe('haveFilesChanged', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the number of changed files is greater than 0', () => {
    beforeEach(() => {
      getChangedFiles.mockReturnValueOnce(['.editorconfig', '.gitignore', 'package.json', 'pnpm-lock.yaml']);
    });

    it('should return true', () => {
      expect(haveFilesChanged('v1.1.0')).toBe(true);
    });
  });

  describe('when the number of changed files is 0', () => {
    it('should return false', () => {
      expect(haveFilesChanged('v1.1.0')).toBe(false);
    });
  });
});
