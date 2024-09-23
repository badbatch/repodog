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
const { existsSync } = jest.mocked(await import('node:fs'));
const { getPackageManager } = await import('./getPackageManager.ts');

describe('getPackageManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when repo has npm lock file', () => {
    beforeEach(() => {
      existsSync.mockImplementation(path => path === '/root/package-lock.json');
    });

    it('should return npm', () => {
      expect(getPackageManager()).toBe(PackageManager.NPM);
    });
  });

  describe('when repo has pnpm lock file', () => {
    beforeEach(() => {
      existsSync.mockImplementation(path => path === '/root/pnpm-lock.yaml');
    });

    it('should return pnpm', () => {
      expect(getPackageManager()).toBe('pnpm');
    });
  });

  describe('when repo has yarn lock file', () => {
    beforeEach(() => {
      existsSync.mockImplementation(path => path === '/root/yarn.lock');
    });

    it('should return yarn', () => {
      expect(getPackageManager()).toBe('yarn');
    });
  });

  describe('when no lock file is found', () => {
    beforeEach(() => {
      existsSync.mockReturnValue(false);
    });

    it('should return the package manager specified in the config', () => {
      expect(getPackageManager()).toBe('npm');
    });
  });
});
