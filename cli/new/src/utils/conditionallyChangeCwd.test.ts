import { jest } from '@jest/globals';

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  mkdirSync: jest.fn(),
}));

jest.unstable_mockModule('node:path', () => ({
  resolve: jest.fn<typeof import('node:path')['resolve']>().mockImplementation((...paths: string[]) => paths.join('/')),
}));

const mockProcessCwd = jest.mocked((process.cwd = jest.fn<() => string>()));
const mockProcessChdir = jest.mocked((process.chdir = jest.fn()));

describe('conditionallyChangeCwd', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the current working directory ends in the name', () => {
    beforeEach(() => {
      mockProcessCwd.mockReturnValueOnce('/root/alpha');
    });

    it('should not call process.chdir', async () => {
      const { conditionallyChangeCwd } = await import('./conditionallyChangeCwd.ts');
      conditionallyChangeCwd('alpha');
      expect(mockProcessChdir).not.toHaveBeenCalled();
    });
  });

  describe('when the current working directory does not ends in the name', () => {
    beforeEach(() => {
      mockProcessCwd.mockReturnValueOnce('/root');
    });

    it('should call process.chdir with the correct path', async () => {
      const { conditionallyChangeCwd } = await import('./conditionallyChangeCwd.ts');
      conditionallyChangeCwd('alpha');
      expect(mockProcessChdir).toHaveBeenCalledWith('/root/alpha');
    });
  });

  describe('when the target directory does not exist', () => {
    let mkdirSync: jest.Mocked<typeof import('node:fs')['mkdirSync']>;

    beforeEach(async () => {
      mockProcessCwd.mockReturnValueOnce('/root');
      let existsSync: jest.Mocked<typeof import('node:fs')['existsSync']>;
      ({ existsSync, mkdirSync } = jest.mocked(await import('node:fs')));
      existsSync.mockReturnValueOnce(false);
    });

    it('should call mkdirSync with the correct path', async () => {
      const { conditionallyChangeCwd } = await import('./conditionallyChangeCwd.ts');
      conditionallyChangeCwd('alpha');
      expect(mkdirSync).toHaveBeenCalledWith('/root/alpha');
    });
  });
});
