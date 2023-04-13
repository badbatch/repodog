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
      let readFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

      beforeEach(async () => {
        jest.clearAllMocks();
        const { addRepodogConfigToCache, clearRepodogConfigCache } = await import('./repodogConfig.ts');
        clearRepodogConfigCache();
        addRepodogConfigToCache(config);
        ({ readFileSync } = jest.mocked(await import('node:fs')));
      });

      it('should return the cached .repodogrc', async () => {
        const { loadRepodogConfig } = await import('./repodogConfig.ts');
        expect(loadRepodogConfig()).toEqual(config);
      });

      it('should not load the .repodogrc', async () => {
        const { loadRepodogConfig } = await import('./repodogConfig.ts');
        loadRepodogConfig();
        expect(readFileSync).not.toHaveBeenCalled();
      });
    });

    describe('when the config is required', () => {
      describe('when there is an error loading the .repodogrc', () => {
        let readFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

        beforeEach(async () => {
          jest.clearAllMocks();
          const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
          clearRepodogConfigCache();
          ({ readFileSync } = jest.mocked(await import('node:fs')));

          readFileSync.mockImplementationOnce(() => {
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
          jest.clearAllMocks();
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
          jest.clearAllMocks();
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
          jest.clearAllMocks();
          const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
          clearRepodogConfigCache();
          const { existsSync } = jest.mocked(await import('node:fs'));
          existsSync.mockReturnValueOnce(false);
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
      let unlinkSync: jest.Mocked<typeof import('node:fs')['unlinkSync']>;

      beforeEach(async () => {
        jest.clearAllMocks();
        ({ unlinkSync } = jest.mocked(await import('node:fs')));
      });

      it('should call unlinkSync with the correct argument', async () => {
        const { writeRepodogConfig } = await import('./repodogConfig.ts');
        writeRepodogConfig({});
        expect(unlinkSync).toHaveBeenCalledWith('/root/.repodogrc');
      });
    });

    describe('when the config still has properties', () => {
      let writeFileSync: jest.Mocked<typeof import('node:fs')['writeFileSync']>;

      beforeEach(async () => {
        jest.clearAllMocks();
        ({ writeFileSync } = jest.mocked(await import('node:fs')));
      });

      it('should call writeFileSync with the correct arguments', async () => {
        const { writeRepodogConfig } = await import('./repodogConfig.ts');
        writeRepodogConfig({ templateVariables: { new: {} } });

        expect(writeFileSync).toHaveBeenCalledWith(
          '/root/.repodogrc',
          JSON.stringify({ templateVariables: { new: {} } }, undefined, 2)
        );
      });
    });
  });
});
