import { jest } from '@jest/globals';

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest.fn().mockReturnValue('{ "__activeDryRun": true }'),
  unlinkSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

process.cwd = () => '/root';

describe('repodogConfig', () => {
  describe('loadRepodogConfig', () => {
    const config = { __activeDryRun: true };

    describe('when there is a cached .repodogrc', () => {
      let mockedReadFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

      beforeEach(async () => {
        const { addRepodogConfigToCache, clearRepodogConfigCache } = await import('./repodogConfig.ts');
        clearRepodogConfigCache();
        addRepodogConfigToCache(config);

        const { readFileSync } = await import('node:fs');
        mockedReadFileSync = jest.mocked(readFileSync);
        mockedReadFileSync.mockClear();
      });

      it('should return the cached .repodogrc', async () => {
        const { loadRepodogConfig } = await import('./repodogConfig.ts');
        expect(loadRepodogConfig()).toEqual(config);
      });

      it('should not load the .repodogrc', async () => {
        const { loadRepodogConfig } = await import('./repodogConfig.ts');
        loadRepodogConfig();
        expect(mockedReadFileSync).not.toHaveBeenCalled();
      });
    });

    describe('when the config is required', () => {
      describe('when there is an error loading the .repodogrc', () => {
        let mockedReadFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

        beforeEach(async () => {
          const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
          clearRepodogConfigCache();

          const { readFileSync } = await import('node:fs');
          mockedReadFileSync = jest.mocked(readFileSync);
          mockedReadFileSync.mockClear();

          mockedReadFileSync.mockImplementationOnce(() => {
            throw new Error('oops');
          });
        });

        it('should throw the correct error', async () => {
          const { loadRepodogConfig } = await import('./repodogConfig.ts');

          expect(() => loadRepodogConfig({ required: true })).toThrow(
            new Error('Could not resolve the .repodogrc at: /root/.repodogrc')
          );
        });
      });

      describe('when the .repodogrc is loaded from the file system', () => {
        beforeEach(async () => {
          const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
          clearRepodogConfigCache();
        });

        it('should return the .repodogrc', async () => {
          const { loadRepodogConfig } = await import('./repodogConfig.ts');
          expect(loadRepodogConfig({ required: true })).toEqual(config);
        });

        it('should cache the .repodogrc', async () => {
          const { getCachedRepodogConfig, loadRepodogConfig } = await import('./repodogConfig.ts');
          loadRepodogConfig({ required: true });
          expect(getCachedRepodogConfig()).toEqual(config);
        });
      });
    });

    describe('when the config is not required', () => {
      describe('when there is an existing config', () => {
        beforeEach(async () => {
          const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
          clearRepodogConfigCache();
        });

        it('should return the .repodogrc', async () => {
          const { loadRepodogConfig } = await import('./repodogConfig.ts');
          expect(loadRepodogConfig()).toEqual(config);
        });

        it('should cache the .repodogrc', async () => {
          const { getCachedRepodogConfig, loadRepodogConfig } = await import('./repodogConfig.ts');
          loadRepodogConfig();
          expect(getCachedRepodogConfig()).toEqual(config);
        });
      });

      describe('when there is not an existing config', () => {
        beforeEach(async () => {
          const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
          clearRepodogConfigCache();

          const { existsSync } = await import('node:fs');
          const mockedExistsSync = jest.mocked(existsSync);
          mockedExistsSync.mockReset();
          mockedExistsSync.mockReturnValueOnce(false);
        });

        it('should return an empty object', async () => {
          const { loadRepodogConfig } = await import('./repodogConfig.ts');
          expect(loadRepodogConfig()).toEqual({});
        });

        it('should cache the empty object', async () => {
          const { getCachedRepodogConfig, loadRepodogConfig } = await import('./repodogConfig.ts');
          loadRepodogConfig();
          expect(getCachedRepodogConfig()).toEqual({});
        });
      });
    });
  });

  describe('writeRepodogConfig', () => {
    describe('when the config is empty', () => {
      let mockedUnlinkSync: jest.Mocked<typeof import('node:fs')['unlinkSync']>;

      beforeEach(async () => {
        const { unlinkSync } = await import('node:fs');
        mockedUnlinkSync = jest.mocked(unlinkSync);
        mockedUnlinkSync.mockClear();
      });

      it('should call unlinkSync with the correct argument', async () => {
        const { writeRepodogConfig } = await import('./repodogConfig.ts');
        writeRepodogConfig({});
        expect(mockedUnlinkSync).toHaveBeenCalledWith('/root/.repodogrc');
      });
    });

    describe('when the config still has properties', () => {
      let mockedWriteFileSync: jest.Mocked<typeof import('node:fs')['writeFileSync']>;

      beforeEach(async () => {
        const { writeFileSync } = await import('node:fs');
        mockedWriteFileSync = jest.mocked(writeFileSync);
        mockedWriteFileSync.mockClear();
      });

      it('should call writeFileSync with the correct arguments', async () => {
        const { writeRepodogConfig } = await import('./repodogConfig.ts');
        writeRepodogConfig({ templateVariables: { new: {} } });

        expect(mockedWriteFileSync).toHaveBeenCalledWith(
          '/root/.repodogrc',
          JSON.stringify({ templateVariables: { new: {} } }, undefined, 2)
        );
      });
    });
  });
});
