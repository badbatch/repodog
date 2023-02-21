import { jest } from '@jest/globals';
import type { RepodogConfig } from './types.js';

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn(),
  unlinkSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

jest.unstable_mockModule('./loadRepodogConfig.js', () => ({
  loadRepodogConfig: jest.fn(),
}));

process.cwd = () => '/root';

describe('dryRunFlag', () => {
  describe('clearDryRunFlag', () => {
    describe('when the config is empty after removing __activeDryRun flag', () => {
      let mockedUnlinkSync: jest.Mocked<typeof import('node:fs')['unlinkSync']>;

      beforeEach(async () => {
        const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
        const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
        mockedLoadRepodogConfig.mockReset();
        mockedLoadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true });

        const { unlinkSync } = await import('node:fs');
        mockedUnlinkSync = jest.mocked(unlinkSync);
        mockedUnlinkSync.mockClear();
      });

      it('should call unlinkSync with the correct argument', async () => {
        const { clearDryRunFlag } = await import('./dryRunFlag.js');
        clearDryRunFlag();
        expect(mockedUnlinkSync).toHaveBeenCalledWith('/root/.repodogrc');
      });
    });

    describe('when the config still have properties after removing __activeDryRun flag', () => {
      let mockedWriteFileSync: jest.Mocked<typeof import('node:fs')['writeFileSync']>;

      beforeEach(async () => {
        const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
        const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
        mockedLoadRepodogConfig.mockReset();
        mockedLoadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true, alpha: 'bravo' } as RepodogConfig);

        const { writeFileSync } = await import('node:fs');
        mockedWriteFileSync = jest.mocked(writeFileSync);
        mockedWriteFileSync.mockClear();
      });

      it('should call writeFileSync with the correct arguments', async () => {
        const { clearDryRunFlag } = await import('./dryRunFlag.js');
        clearDryRunFlag();

        expect(mockedWriteFileSync).toHaveBeenCalledWith(
          '/root/.repodogrc',
          JSON.stringify({ alpha: 'bravo' }, undefined, 2)
        );
      });
    });
  });

  describe('hasDryRunFlag', () => {
    describe('when the config does not exist', () => {
      beforeEach(async () => {
        const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
        const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
        mockedLoadRepodogConfig.mockReset();
        mockedLoadRepodogConfig.mockReturnValueOnce({});

        const { existsSync } = await import('node:fs');
        const mockedExistsSync = jest.mocked(existsSync);
        mockedExistsSync.mockReset();
        mockedExistsSync.mockReturnValueOnce(false);
      });

      it('should return false', async () => {
        const { hasDryRunFlag } = await import('./dryRunFlag.js');
        expect(hasDryRunFlag()).toBe(false);
      });
    });

    describe('when the config does not include __activeDryRun flag', () => {
      beforeEach(async () => {
        const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
        const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
        mockedLoadRepodogConfig.mockReset();
        mockedLoadRepodogConfig.mockReturnValueOnce({});

        const { existsSync } = await import('node:fs');
        const mockedExistsSync = jest.mocked(existsSync);
        mockedExistsSync.mockReset();
        mockedExistsSync.mockReturnValueOnce(true);
      });

      it('should return false', async () => {
        const { hasDryRunFlag } = await import('./dryRunFlag.js');
        expect(hasDryRunFlag()).toBe(false);
      });
    });

    describe('when the config does include __activeDryRun flag', () => {
      beforeEach(async () => {
        const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
        const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
        mockedLoadRepodogConfig.mockReset();
        mockedLoadRepodogConfig.mockReturnValueOnce({ __activeDryRun: true });

        const { existsSync } = await import('node:fs');
        const mockedExistsSync = jest.mocked(existsSync);
        mockedExistsSync.mockReset();
        mockedExistsSync.mockReturnValueOnce(true);
      });

      it('should return true', async () => {
        const { hasDryRunFlag } = await import('./dryRunFlag.js');
        expect(hasDryRunFlag()).toBe(true);
      });
    });
  });

  describe('setDryRunFlag', () => {
    describe('when the config does not exist', () => {
      let mockedWriteFileSync: jest.Mocked<typeof import('node:fs')['writeFileSync']>;

      beforeEach(async () => {
        const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
        const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
        mockedLoadRepodogConfig.mockReset();
        mockedLoadRepodogConfig.mockReturnValueOnce({});

        const { existsSync, writeFileSync } = await import('node:fs');
        const mockedExistsSync = jest.mocked(existsSync);
        mockedExistsSync.mockReset();
        mockedExistsSync.mockReturnValueOnce(false);

        mockedWriteFileSync = jest.mocked(writeFileSync);
        mockedWriteFileSync.mockClear();
      });

      it('should call writeFileSync with new config', async () => {
        const { setDryRunFlag } = await import('./dryRunFlag.js');
        setDryRunFlag();

        expect(mockedWriteFileSync).toHaveBeenCalledWith(
          '/root/.repodogrc',
          JSON.stringify({ __activeDryRun: true }, undefined, 2)
        );
      });
    });

    describe('when the config does exist', () => {
      let mockedWriteFileSync: jest.Mocked<typeof import('node:fs')['writeFileSync']>;

      beforeEach(async () => {
        const { loadRepodogConfig } = await import('./loadRepodogConfig.js');
        const mockedLoadRepodogConfig = jest.mocked(loadRepodogConfig);
        mockedLoadRepodogConfig.mockReset();
        mockedLoadRepodogConfig.mockReturnValueOnce({ alpha: 'bravo' } as RepodogConfig);

        const { existsSync, writeFileSync } = await import('node:fs');
        const mockedExistsSync = jest.mocked(existsSync);
        mockedExistsSync.mockReset();
        mockedExistsSync.mockReturnValueOnce(true);

        mockedWriteFileSync = jest.mocked(writeFileSync);
        mockedWriteFileSync.mockClear();
      });

      it('should call writeFileSync with enriched existing config', async () => {
        const { setDryRunFlag } = await import('./dryRunFlag.js');
        setDryRunFlag();

        expect(mockedWriteFileSync).toHaveBeenCalledWith(
          '/root/.repodogrc',
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          JSON.stringify({ alpha: 'bravo', __activeDryRun: true }, undefined, 2)
        );
      });
    });
  });
});
