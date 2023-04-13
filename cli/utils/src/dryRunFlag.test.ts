import { jest } from '@jest/globals';
import type { RepodogConfig } from './types.ts';

jest.unstable_mockModule('./repodogConfig.ts', () => ({
  loadRepodogConfig: jest.fn(),
  writeRepodogConfig: jest.fn(),
}));

describe('dryRunFlag', () => {
  describe('clearDryRunFlag', () => {
    let writeRepodogConfig: jest.Mocked<typeof import('./repodogConfig.ts')['writeRepodogConfig']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      let loadRepodogConfig: jest.Mocked<typeof import('./repodogConfig.ts')['loadRepodogConfig']>;
      ({ loadRepodogConfig, writeRepodogConfig } = jest.mocked(await import('./repodogConfig.ts')));
      loadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true });
    });

    it('should call writeRepodogConfig with the correct argument', async () => {
      const { clearDryRunFlag } = await import('./dryRunFlag.ts');
      clearDryRunFlag();
      expect(writeRepodogConfig).toHaveBeenCalledWith({});
    });
  });

  describe('hasDryRunFlag', () => {
    describe('when the config does not include __activeDryRun flag', () => {
      beforeEach(async () => {
        jest.clearAllMocks();
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
        jest.clearAllMocks();
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
    let writeRepodogConfig: jest.Mocked<typeof import('./repodogConfig.ts')['writeRepodogConfig']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      let loadRepodogConfig: jest.Mocked<typeof import('./repodogConfig.ts')['loadRepodogConfig']>;
      ({ loadRepodogConfig, writeRepodogConfig } = jest.mocked(await import('./repodogConfig.ts')));
      loadRepodogConfig.mockReturnValueOnce({ alpha: 'bravo' } as RepodogConfig);
    });

    it('should call writeRepodogConfig with enriched existing config', async () => {
      const { setDryRunFlag } = await import('./dryRunFlag.ts');
      setDryRunFlag();
      expect(writeRepodogConfig).toHaveBeenCalledWith({ __activeDryRun: true, alpha: 'bravo' });
    });
  });
});
