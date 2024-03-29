import { jest } from '@jest/globals';
import { PackageManager } from './types.ts';

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn(),
}));

jest.unstable_mockModule('./repodogConfig.ts', () => ({
  loadRepodogConfig: () => ({
    packageManager: 'npm',
  }),
}));

process.cwd = jest.fn().mockReturnValue('/root') as jest.Mocked<() => string>;

describe('getPackageManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when repo has npm lock file', () => {
    beforeEach(async () => {
      const { existsSync } = jest.mocked(await import('node:fs'));
      existsSync.mockImplementation(path => path === '/root/package-lock.json');
    });

    it('should return npm', async () => {
      const { getPackageManager } = await import('./getPackageManager.ts');
      expect(getPackageManager()).toBe(PackageManager.NPM);
    });
  });

  describe('when repo has pnpm lock file', () => {
    beforeEach(async () => {
      const { existsSync } = jest.mocked(await import('node:fs'));
      existsSync.mockImplementation(path => path === '/root/pnpm-lock.yaml');
    });

    it('should return pnpm', async () => {
      const { getPackageManager } = await import('./getPackageManager.ts');
      expect(getPackageManager()).toBe('pnpm');
    });
  });

  describe('when repo has yarn lock file', () => {
    beforeEach(async () => {
      const { existsSync } = jest.mocked(await import('node:fs'));
      existsSync.mockImplementation(path => path === '/root/yarn.lock');
    });

    it('should return yarn', async () => {
      const { getPackageManager } = await import('./getPackageManager.ts');
      expect(getPackageManager()).toBe('yarn');
    });
  });

  describe('when no lock file is found', () => {
    beforeEach(async () => {
      const { existsSync } = jest.mocked(await import('node:fs'));
      existsSync.mockReturnValue(false);
    });

    it('should return the package manager specified in the config', async () => {
      const { getPackageManager } = await import('./getPackageManager.ts');
      expect(getPackageManager()).toBe('npm');
    });
  });
});
