import { jest } from '@jest/globals';
import { Language, PackageManager } from './types.ts';

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest.fn().mockReturnValue(JSON.stringify({ __activeDryRun: true, language: Language.TYPESCRIPT })),
  unlinkSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

jest.unstable_mockModule('node:os', () => ({
  homedir: jest.fn().mockReturnValue('/'),
}));

jest.unstable_mockModule('./resolveConfigPath.ts', () => ({
  resolveConfigPath: jest.fn(),
}));

process.cwd = () => '/root';

describe('repodogConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadRepodogConfig', () => {
    const config = { __activeDryRun: true, language: Language.TYPESCRIPT };

    describe('when there is a cached .repodogrc', () => {
      let readFileSync: jest.Mocked<(typeof import('node:fs'))['readFileSync']>;

      beforeEach(async () => {
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
        let readFileSync: jest.Mocked<(typeof import('node:fs'))['readFileSync']>;

        beforeEach(async () => {
          const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
          clearRepodogConfigCache();
          ({ readFileSync } = jest.mocked(await import('node:fs')));

          readFileSync
            .mockImplementationOnce(() => {
              throw new Error('oops');
            })
            .mockImplementationOnce(() => {
              throw new Error('oops');
            });
        });

        it('should throw the correct error', async () => {
          const { loadRepodogConfig } = await import('./repodogConfig.ts');

          expect(() => loadRepodogConfig({ required: true })).toThrow(
            new Error('Could not resolve the .repodogrc either within a project or globally'),
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
          const { readFileSync } = jest.mocked(await import('node:fs'));

          readFileSync
            .mockImplementationOnce(() => {
              throw new Error('oops');
            })
            .mockImplementationOnce(() => {
              throw new Error('oops');
            });
        });

        it('should return a partial config', async () => {
          const { loadRepodogConfig } = await import('./repodogConfig.ts');
          expect(loadRepodogConfig()).toEqual({ language: Language.TYPESCRIPT });
        });

        it('should cache the partial config', async () => {
          const { getCachedRepodogConfig, loadRepodogConfig } = await import('./repodogConfig.ts');
          loadRepodogConfig();
          expect(getCachedRepodogConfig()).toEqual({ language: Language.TYPESCRIPT });
        });
      });
    });

    describe('when questionOverridesPath is present in the config', () => {
      let resolveConfigPath: jest.Mocked<(typeof import('./resolveConfigPath.ts'))['resolveConfigPath']>;

      const enrichedConfig = {
        __activeDryRun: true,
        language: Language.TYPESCRIPT,
        questionOverridesPath: './questionOverridesPath',
      };

      beforeEach(async () => {
        const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
        clearRepodogConfigCache();
        const { readFileSync } = jest.mocked(await import('node:fs'));
        readFileSync.mockReturnValueOnce(JSON.stringify(enrichedConfig));
        ({ resolveConfigPath } = jest.mocked(await import('./resolveConfigPath.ts')));
      });

      it('should call resolveConfigPath with the correct arguments', async () => {
        const { loadRepodogConfig } = await import('./repodogConfig.ts');
        loadRepodogConfig();
        expect(resolveConfigPath).toHaveBeenCalledWith(enrichedConfig, 'questionOverrides', './questionOverridesPath');
      });
    });

    describe('when templateVariablesPath is present in the config', () => {
      let resolveConfigPath: jest.Mocked<(typeof import('./resolveConfigPath.ts'))['resolveConfigPath']>;

      const enrichedConfig = {
        __activeDryRun: true,
        language: Language.TYPESCRIPT,
        templateVariablesPath: './templateVariablesPath',
      };

      beforeEach(async () => {
        const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
        clearRepodogConfigCache();
        const { readFileSync } = jest.mocked(await import('node:fs'));
        readFileSync.mockReturnValueOnce(JSON.stringify(enrichedConfig));
        ({ resolveConfigPath } = jest.mocked(await import('./resolveConfigPath.ts')));
      });

      it('should call resolveConfigPath with the correct arguments', async () => {
        const { loadRepodogConfig } = await import('./repodogConfig.ts');
        loadRepodogConfig();
        expect(resolveConfigPath).toHaveBeenCalledWith(enrichedConfig, 'templateVariables', './templateVariablesPath');
      });
    });
  });

  describe('writeRepodogConfig', () => {
    let writeFileSync: jest.Mocked<(typeof import('node:fs'))['writeFileSync']>;

    beforeEach(async () => {
      const { clearRepodogConfigCache } = await import('./repodogConfig.ts');
      clearRepodogConfigCache();
      ({ writeFileSync } = jest.mocked(await import('node:fs')));
    });

    describe('when there is a cached config', () => {
      beforeEach(async () => {
        const { addRepodogConfigToCache } = await import('./repodogConfig.ts');
        addRepodogConfigToCache({ packageManager: PackageManager.NPM });
      });

      it('should call writeFileSync with the correct arguments', async () => {
        const { writeRepodogConfig } = await import('./repodogConfig.ts');
        writeRepodogConfig(process.cwd(), { templateVariables: { new: {} } });

        expect(writeFileSync).toHaveBeenCalledWith(
          '/root/.repodogrc',
          JSON.stringify(
            // eslint-disable-next-line sort-keys-fix/sort-keys-fix
            { packageManager: PackageManager.NPM, language: Language.TYPESCRIPT, templateVariables: { new: {} } },
            undefined,
            2,
          ),
        );
      });
    });
  });
});
