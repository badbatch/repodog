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
const { readFileSync, writeFileSync } = jest.mocked(await import('node:fs'));
const { resolveConfigPath } = jest.mocked(await import('./resolveConfigPath.ts'));

const {
  addRepodogConfigToCache,
  clearRepodogConfigCache,
  getCachedRepodogConfig,
  loadRepodogConfig,
  writeRepodogConfig,
} = await import('./repodogConfig.ts');

describe('repodogConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadRepodogConfig', () => {
    const config = { __activeDryRun: true, language: Language.TYPESCRIPT };

    describe('when there is a cached .repodogrc', () => {
      beforeEach(() => {
        clearRepodogConfigCache();
        addRepodogConfigToCache(config);
      });

      it('should return the cached .repodogrc', () => {
        expect(loadRepodogConfig()).toEqual(config);
      });

      it('should not load the .repodogrc', () => {
        loadRepodogConfig();
        expect(readFileSync).not.toHaveBeenCalled();
      });
    });

    describe('when the config is required', () => {
      describe('when there is an error loading the .repodogrc', () => {
        beforeEach(() => {
          clearRepodogConfigCache();

          readFileSync
            .mockImplementationOnce(() => {
              throw new Error('oops');
            })
            .mockImplementationOnce(() => {
              throw new Error('oops');
            });
        });

        it('should throw the correct error', () => {
          expect(() => loadRepodogConfig({ required: true })).toThrow(
            new Error('Could not resolve the .repodogrc either within a project or globally'),
          );
        });
      });

      describe('when the .repodogrc is loaded from the file system', () => {
        beforeEach(() => {
          clearRepodogConfigCache();
        });

        it('should return the .repodogrc', () => {
          expect(loadRepodogConfig({ required: true })).toEqual(config);
        });

        it('should cache the .repodogrc', () => {
          loadRepodogConfig({ required: true });
          expect(getCachedRepodogConfig()).toEqual(config);
        });
      });
    });

    describe('when the config is not required', () => {
      describe('when there is an existing config', () => {
        beforeEach(() => {
          clearRepodogConfigCache();
        });

        it('should return the .repodogrc', () => {
          expect(loadRepodogConfig()).toEqual(config);
        });

        it('should cache the .repodogrc', () => {
          loadRepodogConfig();
          expect(getCachedRepodogConfig()).toEqual(config);
        });
      });

      describe('when there is not an existing config', () => {
        beforeEach(() => {
          clearRepodogConfigCache();

          readFileSync
            .mockImplementationOnce(() => {
              throw new Error('oops');
            })
            .mockImplementationOnce(() => {
              throw new Error('oops');
            });
        });

        it('should return a partial config', () => {
          expect(loadRepodogConfig()).toEqual({ language: Language.TYPESCRIPT });
        });

        it('should cache the partial config', () => {
          loadRepodogConfig();
          expect(getCachedRepodogConfig()).toEqual({ language: Language.TYPESCRIPT });
        });
      });
    });

    describe('when questionOverridesPath is present in the config', () => {
      const enrichedConfig = {
        __activeDryRun: true,
        language: Language.TYPESCRIPT,
        questionOverridesPath: './questionOverridesPath',
      };

      beforeEach(() => {
        clearRepodogConfigCache();
        readFileSync.mockReturnValueOnce(JSON.stringify(enrichedConfig));
      });

      it('should call resolveConfigPath with the correct arguments', () => {
        loadRepodogConfig();
        expect(resolveConfigPath).toHaveBeenCalledWith(enrichedConfig, 'questionOverrides', './questionOverridesPath');
      });
    });

    describe('when templateVariablesPath is present in the config', () => {
      const enrichedConfig = {
        __activeDryRun: true,
        language: Language.TYPESCRIPT,
        templateVariablesPath: './templateVariablesPath',
      };

      beforeEach(() => {
        clearRepodogConfigCache();
        readFileSync.mockReturnValueOnce(JSON.stringify(enrichedConfig));
      });

      it('should call resolveConfigPath with the correct arguments', () => {
        loadRepodogConfig();
        expect(resolveConfigPath).toHaveBeenCalledWith(enrichedConfig, 'templateVariables', './templateVariablesPath');
      });
    });
  });

  describe('writeRepodogConfig', () => {
    beforeEach(() => {
      clearRepodogConfigCache();
    });

    describe('when there is a cached config', () => {
      beforeEach(() => {
        addRepodogConfigToCache({ packageManager: PackageManager.NPM });
      });

      it('should call writeFileSync with the correct arguments', () => {
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
