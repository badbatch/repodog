import { jest } from '@jest/globals';
import { Language, type RepodogConfig } from './types.ts';

jest.unstable_mockModule('./repodogConfig.ts', () => ({
  loadRepodogConfig: jest.fn(),
  writeRepodogConfig: jest.fn(),
}));

process.cwd = () => '/root';

describe('dryRunFlag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('clearDryRunFlag', () => {
    let writeRepodogConfig: jest.Mocked<(typeof import('./repodogConfig.ts'))['writeRepodogConfig']>;

    beforeEach(async () => {
      let loadRepodogConfig: jest.Mocked<(typeof import('./repodogConfig.ts'))['loadRepodogConfig']>;
      ({ loadRepodogConfig, writeRepodogConfig } = jest.mocked(await import('./repodogConfig.ts')));
      loadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true });
    });

    it('should call writeRepodogConfig with the correct argument', async () => {
      const { clearDryRunFlag } = await import('./dryRunFlag.ts');
      clearDryRunFlag();
      expect(writeRepodogConfig).toHaveBeenCalledWith('/root', {});
    });
  });

  describe('hasDryRunFlag', () => {
    describe('when the config does not include __activeDryRun flag', () => {
      beforeEach(async () => {
        const { loadRepodogConfig } = jest.mocked(await import('./repodogConfig.ts'));
        loadRepodogConfig.mockReturnValueOnce({});
      });

      it('should return false', async () => {
        const { hasDryRunFlag } = await import('./dryRunFlag.ts');
        expect(hasDryRunFlag()).toBe(false);
      });
    });

    describe('when the config does include __activeDryRun flag', () => {
      beforeEach(async () => {
        const { loadRepodogConfig } = jest.mocked(await import('./repodogConfig.ts'));
        loadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true });
      });

      it('should return true', async () => {
        const { hasDryRunFlag } = await import('./dryRunFlag.ts');
        expect(hasDryRunFlag()).toBe(true);
      });
    });
  });

  describe('setDryRunFlag', () => {
    let writeRepodogConfig: jest.Mocked<(typeof import('./repodogConfig.ts'))['writeRepodogConfig']>;

    beforeEach(async () => {
      let loadRepodogConfig: jest.Mocked<(typeof import('./repodogConfig.ts'))['loadRepodogConfig']>;
      ({ loadRepodogConfig, writeRepodogConfig } = jest.mocked(await import('./repodogConfig.ts')));
      loadRepodogConfig.mockReturnValueOnce({ alpha: 'bravo', language: Language.TYPESCRIPT } as RepodogConfig);
    });

    it('should call writeRepodogConfig with enriched existing config', async () => {
      const { setDryRunFlag } = await import('./dryRunFlag.ts');
      setDryRunFlag();

      expect(writeRepodogConfig).toHaveBeenCalledWith('/root', {
        __activeDryRun: true,
        alpha: 'bravo',
        language: Language.TYPESCRIPT,
      });
    });
  });
});
