import { jest } from '@jest/globals';

jest.unstable_mockModule('node:fs', () => ({
  readFileSync: jest.fn().mockReturnValue('{ "__activeDryRun": true }'),
}));

process.cwd = () => '/root';

describe('loadRepodogConfig', () => {
  const config = { __activeDryRun: true };

  describe('when there is a cached .repodogrc', () => {
    let mockedReadFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

    beforeEach(async () => {
      const { addRepodogConfigToCache, clearRepodogConfigCache } = await import('./loadRepodogConfig.js');
      clearRepodogConfigCache();
      addRepodogConfigToCache(config);

      const { readFileSync } = await import('node:fs');
      mockedReadFileSync = jest.mocked(readFileSync);
      mockedReadFileSync.mockClear();
    });

    it('should return the cached .repodogrc', async () => {
      const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
      expect(loadRepodogConfig()).toEqual(config);
    });

    it('should not load the .repodogrc', async () => {
      const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
      loadRepodogConfig();
      expect(mockedReadFileSync).not.toHaveBeenCalled();
    });
  });

  describe('when there is an error loading the .repodogrc', () => {
    let mockedReadFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

    beforeEach(async () => {
      const { clearRepodogConfigCache } = await import('./loadRepodogConfig.js');
      clearRepodogConfigCache();

      const { readFileSync } = await import('node:fs');
      mockedReadFileSync = jest.mocked(readFileSync);
      mockedReadFileSync.mockClear();

      mockedReadFileSync.mockImplementationOnce(() => {
        throw new Error('oops');
      });
    });

    it('should throw the correct error', async () => {
      const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
      expect(() => loadRepodogConfig()).toThrow(new Error('Could not resolve the .repodogrc at: /root/.repodogrc'));
    });
  });

  describe('when the .repodogrc is loaded from the file system', () => {
    beforeEach(async () => {
      const { clearRepodogConfigCache } = await import('./loadRepodogConfig.js');
      clearRepodogConfigCache();
    });

    it('should return the .repodogrc', async () => {
      const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
      expect(loadRepodogConfig()).toEqual(config);
    });

    it('should cache the .repodogrc', async () => {
      const { getCachedRepodogConfig, loadRepodogConfig } = await import('./loadRepodogConfig.js');
      loadRepodogConfig();
      expect(getCachedRepodogConfig()).toEqual(config);
    });
  });
});
