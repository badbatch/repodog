import { jest } from '@jest/globals';
import { sep } from 'node:path';

jest.unstable_mockModule('node:path', () => ({
  isAbsolute: jest.fn().mockReturnValue(false),
  resolve: jest.fn().mockImplementation((...paths) => paths.join(sep)),
}));

process.cwd = () => '/root';
const { isAbsolute, resolve } = jest.mocked(await import('node:path'));
const { resolveAbsolutePath } = await import('./resolveAbsolutePath.ts');

describe('resolveAbsolutePath', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when path is not absolute', () => {
    it('should call resolve with the correct arguments', () => {
      resolveAbsolutePath('./path/to/file');
      expect(resolve).toHaveBeenCalledWith('/root', './path/to/file');
    });

    it('should return the correct path', () => {
      resolveAbsolutePath('path/to/file');
      expect(resolveAbsolutePath('path/to/file')).toBe('/root/path/to/file');
    });
  });

  describe('when path is absolute', () => {
    beforeEach(() => {
      isAbsolute.mockReturnValueOnce(true);
    });

    it('should not call resolve', () => {
      resolveAbsolutePath('/absolute/path/to/file');
      expect(resolve).not.toHaveBeenCalled();
    });

    it('should return the correct path', () => {
      expect(resolveAbsolutePath('/absolute/path/to/file')).toBe('/absolute/path/to/file');
    });
  });
});
