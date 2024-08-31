import { jest } from '@jest/globals';
import { sep } from 'node:path';

jest.unstable_mockModule('node:path', () => ({
  isAbsolute: jest.fn().mockReturnValue(false),
  resolve: jest.fn().mockImplementation((...paths) => paths.join(sep)),
}));

process.cwd = () => '/root';

describe('resolveAbsolutePath', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when path is not absolute', () => {
    let resolve: jest.Mocked<(typeof import('node:path'))['resolve']>;

    beforeEach(async () => {
      ({ resolve } = jest.mocked(await import('node:path')));
    });

    it('should call resolve with the correct arguments', async () => {
      const { resolveAbsolutePath } = await import('./resolveAbsolutePath.ts');
      resolveAbsolutePath('./path/to/file');
      expect(resolve).toHaveBeenCalledWith('/root', './path/to/file');
    });

    it('should return the correct path', async () => {
      const { resolveAbsolutePath } = await import('./resolveAbsolutePath.ts');
      resolveAbsolutePath('path/to/file');
      expect(resolveAbsolutePath('path/to/file')).toBe('/root/path/to/file');
    });
  });

  describe('when path is absolute', () => {
    let resolve: jest.Mocked<(typeof import('node:path'))['resolve']>;

    beforeEach(async () => {
      let isAbsolute: jest.Mocked<(typeof import('node:path'))['isAbsolute']>;
      ({ isAbsolute, resolve } = jest.mocked(await import('node:path')));
      isAbsolute.mockReturnValueOnce(true);
    });

    it('should not call resolve', async () => {
      const { resolveAbsolutePath } = await import('./resolveAbsolutePath.ts');
      resolveAbsolutePath('/absolute/path/to/file');
      expect(resolve).not.toHaveBeenCalled();
    });

    it('should return the correct path', async () => {
      const { resolveAbsolutePath } = await import('./resolveAbsolutePath.ts');
      expect(resolveAbsolutePath('/absolute/path/to/file')).toBe('/absolute/path/to/file');
    });
  });
});
