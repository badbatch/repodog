import { jest } from '@jest/globals';
import { Language } from './types.ts';

jest.unstable_mockModule('node:fs', () => ({
  readFileSync: jest.fn(),
}));

jest.unstable_mockModule('./resolveAbsolutePath.ts', () => ({
  resolveAbsolutePath: (path: string) => `/root/${path}`,
}));

const baseConfig = {
  language: Language.TYPESCRIPT,
  questionOverridesPath: './questionOverridesPath',
  templateVariablesPath: './templateVariablesPath',
};

describe('resolveConfigPath', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when config path exists', () => {
    describe('when the config already has a value for the provided key', () => {
      beforeEach(async () => {
        const { readFileSync } = jest.mocked(await import('node:fs'));

        readFileSync.mockReturnValueOnce(
          JSON.stringify({
            new: {
              pkg: {
                cli: {
                  alpha: 'bravo',
                },
              },
            },
          })
        );
      });

      it('should merge the loaded config with the existing key value', async () => {
        const { resolveConfigPath } = await import('./resolveConfigPath.ts');

        const config = {
          ...baseConfig,
          templateVariables: {
            new: {
              pkg: {
                cli: {
                  charlie: 'delta',
                },
              },
            },
          },
        };

        resolveConfigPath(config, 'templateVariables', baseConfig.templateVariablesPath);

        expect(config).toEqual({
          ...baseConfig,
          templateVariables: {
            new: {
              pkg: {
                cli: {
                  alpha: 'bravo',
                  charlie: 'delta',
                },
              },
            },
          },
        });
      });
    });

    describe('when the config does not have a value for the provided key', () => {
      beforeEach(async () => {
        const { readFileSync } = jest.mocked(await import('node:fs'));

        readFileSync.mockReturnValueOnce(
          JSON.stringify({
            new: {
              pkg: {
                cli: {
                  alpha: 'bravo',
                },
              },
            },
          })
        );
      });

      it('should set the loaded config as the value', async () => {
        const { resolveConfigPath } = await import('./resolveConfigPath.ts');
        const config = { ...baseConfig };
        resolveConfigPath(config, 'templateVariables', baseConfig.templateVariablesPath);

        expect(config).toEqual({
          ...baseConfig,
          templateVariables: {
            new: {
              pkg: {
                cli: {
                  alpha: 'bravo',
                },
              },
            },
          },
        });
      });
    });
  });

  describe('when config path does not exist', () => {
    beforeEach(async () => {
      const { readFileSync } = jest.mocked(await import('node:fs'));

      readFileSync.mockImplementationOnce(() => {
        throw new Error('Oops');
      });
    });

    it('should not modify the config', async () => {
      const { resolveConfigPath } = await import('./resolveConfigPath.ts');
      const config = { ...baseConfig };
      resolveConfigPath(config, 'templateVariables', baseConfig.templateVariablesPath);
      expect(config).toEqual(baseConfig);
    });
  });
});
