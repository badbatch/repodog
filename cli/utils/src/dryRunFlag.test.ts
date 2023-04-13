import { jest } from '@jest/globals';
import type { RepodogConfig } from './types.ts';

jest.unstable_mockModule('./repodogConfig.ts', () => ({
  loadRepodogConfig: jest.fn(),
  writeRepodogConfig: jest.fn(),
}));

describe('dryRunFlag', () => {
  describe('clearDryRunFlag', () => {
    let mockedWriteRepodogConfig: jest.MockedFunction<(repodogConfig: RepodogConfig) => void>;

    beforeEach(async () => {
      const { loadRepodogConfig, writeRepodogConfig } = await import('./repodogConfig.ts');
      const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
      mockedLoadRepodogConfig.mockReset();
      mockedLoadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true });

      mockedWriteRepodogConfig = jest.mocked(writeRepodogConfig);
      mockedWriteRepodogConfig.mockClear();
    });

    it('should call writeRepodogConfig with the correct argument', async () => {
      const { clearDryRunFlag } = await import('./dryRunFlag.ts');
      clearDryRunFlag();
      expect(mockedWriteRepodogConfig).toHaveBeenCalledWith({});
    });
  });

  describe('hasDryRunFlag', () => {
    describe('when the config does not include __activeDryRun flag', () => {
      beforeEach(async () => {
        const { loadRepodogConfig } = await import('./repodogConfig.ts');
        const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
        mockedLoadRepodogConfig.mockReset();
        mockedLoadRepodogConfig.mockReturnValueOnce({});
      });

      it('should return false', async () => {
        const { hasDryRunFlag } = await import('./dryRunFlag.ts');
        expect(hasDryRunFlag()).toBe(false);
      });
    });

    describe('when the config does include __activeDryRun flag', () => {
      beforeEach(async () => {
        const { loadRepodogConfig } = await import('./repodogConfig.ts');
        const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
        mockedLoadRepodogConfig.mockReset();
        mockedLoadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true });
      });

      it('should return true', async () => {
        const { hasDryRunFlag } = await import('./dryRunFlag.ts');
        expect(hasDryRunFlag()).toBe(true);
      });
    });
  });

  describe('setDryRunFlag', () => {
    let mockedWriteRepodogConfig: jest.MockedFunction<(repodogConfig: RepodogConfig) => void>;

    beforeEach(async () => {
      const { loadRepodogConfig, writeRepodogConfig } = await import('./repodogConfig.ts');
      const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
      mockedLoadRepodogConfig.mockReset();
      mockedLoadRepodogConfig.mockReturnValueOnce({ alpha: 'bravo' } as RepodogConfig);

      mockedWriteRepodogConfig = jest.mocked(writeRepodogConfig);
      mockedWriteRepodogConfig.mockClear();
    });

    it('should call writeRepodogConfig with enriched existing config', async () => {
      const { setDryRunFlag } = await import('./dryRunFlag.ts');
      setDryRunFlag();
      expect(mockedWriteRepodogConfig).toHaveBeenCalledWith({ __activeDryRun: true, alpha: 'bravo' });
    });
  });
});
