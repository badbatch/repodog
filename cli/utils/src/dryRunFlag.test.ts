import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { language } from '#constants.ts';

jest.unstable_mockModule('#repodogConfig.ts', () => ({
  loadRepodogConfig: jest.fn(),
  writeRepodogConfig: jest.fn(),
}));

process.cwd = () => '/root';
const { loadRepodogConfig, writeRepodogConfig } = jest.mocked(await import('#repodogConfig.ts'));
const { clearDryRunFlag, hasDryRunFlag, setDryRunFlag } = await import('#dryRunFlag.ts');

describe('dryRunFlag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('clearDryRunFlag', () => {
    beforeEach(() => {
      loadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true });
    });

    it('should call writeRepodogConfig with the correct argument', () => {
      clearDryRunFlag();
      expect(writeRepodogConfig).toHaveBeenCalledWith('/root', {});
    });
  });

  describe('hasDryRunFlag', () => {
    describe('when the config does not include __activeDryRun flag', () => {
      beforeEach(() => {
        loadRepodogConfig.mockReturnValueOnce({});
      });

      it('should return false', () => {
        expect(hasDryRunFlag()).toBe(false);
      });
    });

    describe('when the config does include __activeDryRun flag', () => {
      beforeEach(() => {
        loadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true });
      });

      it('should return true', () => {
        expect(hasDryRunFlag()).toBe(true);
      });
    });
  });

  describe('setDryRunFlag', () => {
    beforeEach(() => {
      loadRepodogConfig.mockReturnValueOnce({ language: language.TYPESCRIPT });
    });

    it('should call writeRepodogConfig with enriched existing config', () => {
      setDryRunFlag();

      expect(writeRepodogConfig).toHaveBeenCalledWith('/root', {
        __activeDryRun: true,
        language: language.TYPESCRIPT,
      });
    });
  });
});
