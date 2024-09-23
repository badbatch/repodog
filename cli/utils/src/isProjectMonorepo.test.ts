import { jest } from '@jest/globals';
import { PackageManager } from './types.ts';

jest.unstable_mockModule('js-yaml', () => ({
  load: jest.fn<(value: string) => unknown>().mockImplementation((value: string) => JSON.parse(value)),
}));

jest.unstable_mockModule('node:fs', () => ({
  readFileSync: jest.fn(),
}));

jest.unstable_mockModule('./loadPackageJson.ts', () => ({
  loadPackageJson: jest.fn(),
}));

process.cwd = jest.fn().mockReturnValue('/root') as jest.Mocked<() => string>;
const { readFileSync } = jest.mocked(await import('node:fs'));
const { loadPackageJson } = jest.mocked(await import('./loadPackageJson.ts'));
const { isProjectMonorepo } = await import('./isProjectMonorepo.ts');

describe('isProjectMonorepo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the package manager is npm', () => {
    describe('when there are no workspaces declared', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValue({ name: 'alpha', version: '1.0.0' });
      });

      it('should return false', () => {
        expect(isProjectMonorepo(PackageManager.NPM)).toBe(false);
      });
    });

    describe('when workspaces is an array', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValue({
          name: 'alpha',
          version: '1.0.0',
          workspaces: ['apps/**', 'configs/*', 'graphql/*'],
        });
      });

      it('should return true', () => {
        expect(isProjectMonorepo(PackageManager.NPM)).toBe(true);
      });
    });

    describe('when workspaces is not an array', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValue({
          name: 'alpha',
          version: '1.0.0',
          workspaces: { packages: ['apps/**', 'configs/*', 'graphql/*'] },
        });
      });

      it('should return true', () => {
        expect(isProjectMonorepo(PackageManager.NPM)).toBe(true);
      });
    });
  });

  describe('when the package manager is yarn', () => {
    describe('when there are no workspaces declared', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValue({ name: 'alpha', version: '1.0.0' });
      });

      it('should return false', () => {
        expect(isProjectMonorepo(PackageManager.YARN)).toBe(false);
      });
    });

    describe('when workspaces is an array', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValue({
          name: 'alpha',
          version: '1.0.0',
          workspaces: ['apps/**', 'configs/*', 'graphql/*'],
        });
      });

      it('should return true', () => {
        expect(isProjectMonorepo(PackageManager.YARN)).toBe(true);
      });
    });

    describe('when workspaces is not an array', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValue({
          name: 'alpha',
          version: '1.0.0',
          workspaces: { packages: ['apps/**', 'configs/*', 'graphql/*'] },
        });
      });

      it('should return true', () => {
        expect(isProjectMonorepo(PackageManager.YARN)).toBe(true);
      });
    });
  });

  describe('when the package manager is pnpm', () => {
    describe('when there are no workspaces declared', () => {
      beforeEach(() => {
        readFileSync.mockReturnValue('{}');
      });

      it('should return false', () => {
        expect(isProjectMonorepo(PackageManager.PNPM)).toBe(false);
      });
    });

    describe('when workspaces are declared', () => {
      beforeEach(() => {
        readFileSync.mockReturnValue('{ "packages": ["apps/**", "configs/*", "graphql/*"] }');
      });

      it('should return true', () => {
        expect(isProjectMonorepo(PackageManager.PNPM)).toBe(true);
      });
    });
  });

  describe('when an exception is thrown retreiving patterns', () => {
    beforeEach(() => {
      readFileSync.mockImplementation(() => {
        throw new Error('oops');
      });
    });

    it('should return false', () => {
      expect(isProjectMonorepo(PackageManager.PNPM)).toBe(false);
    });
  });
});
