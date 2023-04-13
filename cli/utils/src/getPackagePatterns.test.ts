import { jest } from '@jest/globals';
import { PackageManager } from './types.ts';

jest.unstable_mockModule('js-yaml', () => ({
  load: jest.fn<(value: string) => unknown>().mockImplementation((value: string) => JSON.parse(value)),
}));

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

jest.unstable_mockModule('./loadPackageJson.ts', () => ({
  loadPackageJson: jest.fn(),
}));

process.cwd = jest.fn().mockReturnValue('/root') as jest.Mocked<() => string>;

describe('getPackagePatterns', () => {
  describe('when the package manager is npm', () => {
    describe('when there are no workspaces declared', () => {
      beforeEach(async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        const mockedLoadPackageJson = jest.mocked(loadPackageJson);
        mockedLoadPackageJson.mockClear();
        mockedLoadPackageJson.mockReturnValue({ name: 'alpha', version: '1.0.0' });
      });

      it('should return the correct patterns', async () => {
        const { getPackagePatterns } = await import('./getPackagePatterns.ts');
        expect(getPackagePatterns(PackageManager.NPM)).toEqual([]);
      });
    });

    describe('when workspaces is an array', () => {
      beforeEach(async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        const mockedLoadPackageJson = jest.mocked(loadPackageJson);
        mockedLoadPackageJson.mockClear();

        mockedLoadPackageJson.mockReturnValue({
          name: 'alpha',
          version: '1.0.0',
          workspaces: ['apps/**', 'configs/*', 'graphql/*'],
        });
      });

      it('should return the correct patterns', async () => {
        const { getPackagePatterns } = await import('./getPackagePatterns.ts');
        expect(getPackagePatterns(PackageManager.NPM)).toEqual(['apps/**', 'configs/*', 'graphql/*']);
      });
    });

    describe('when workspaces is not an array', () => {
      beforeEach(async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        const mockedLoadPackageJson = jest.mocked(loadPackageJson);
        mockedLoadPackageJson.mockClear();

        mockedLoadPackageJson.mockReturnValue({
          name: 'alpha',
          version: '1.0.0',
          workspaces: { packages: ['apps/**', 'configs/*', 'graphql/*'] },
        });
      });

      it('should return the correct patterns', async () => {
        const { getPackagePatterns } = await import('./getPackagePatterns.ts');
        expect(getPackagePatterns(PackageManager.NPM)).toEqual(['apps/**', 'configs/*', 'graphql/*']);
      });
    });
  });

  describe('when the package manager is yarn', () => {
    describe('when there are no workspaces declared', () => {
      beforeEach(async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        const mockedLoadPackageJson = jest.mocked(loadPackageJson);
        mockedLoadPackageJson.mockClear();
        mockedLoadPackageJson.mockReturnValue({ name: 'alpha', version: '1.0.0' });
      });

      it('should return the correct patterns', async () => {
        const { getPackagePatterns } = await import('./getPackagePatterns.ts');
        expect(getPackagePatterns(PackageManager.YARN)).toEqual([]);
      });
    });

    describe('when workspaces is an array', () => {
      beforeEach(async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        const mockedLoadPackageJson = jest.mocked(loadPackageJson);
        mockedLoadPackageJson.mockClear();

        mockedLoadPackageJson.mockReturnValue({
          name: 'alpha',
          version: '1.0.0',
          workspaces: ['apps/**', 'configs/*', 'graphql/*'],
        });
      });

      it('should return the correct patterns', async () => {
        const { getPackagePatterns } = await import('./getPackagePatterns.ts');
        expect(getPackagePatterns(PackageManager.YARN)).toEqual(['apps/**', 'configs/*', 'graphql/*']);
      });
    });

    describe('when workspaces is not an array', () => {
      beforeEach(async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        const mockedLoadPackageJson = jest.mocked(loadPackageJson);
        mockedLoadPackageJson.mockClear();

        mockedLoadPackageJson.mockReturnValue({
          name: 'alpha',
          version: '1.0.0',
          workspaces: { packages: ['apps/**', 'configs/*', 'graphql/*'] },
        });
      });

      it('should return the correct patterns', async () => {
        const { getPackagePatterns } = await import('./getPackagePatterns.ts');
        expect(getPackagePatterns(PackageManager.YARN)).toEqual(['apps/**', 'configs/*', 'graphql/*']);
      });
    });
  });

  describe('when the package manager is pnpm', () => {
    beforeEach(async () => {
      const { readFileSync } = await import('node:fs');
      const mockedReadFileSync = jest.mocked(readFileSync);
      mockedReadFileSync.mockClear();
      mockedReadFileSync.mockReturnValue('{ "packages": ["apps/**", "configs/*", "graphql/*"] }');
    });

    it('should return the correct patterns', async () => {
      const { getPackagePatterns } = await import('./getPackagePatterns.ts');
      expect(getPackagePatterns(PackageManager.PNPM)).toEqual(['apps/**', 'configs/*', 'graphql/*']);
    });
  });

  describe('when an exception is thrown retreiving patterns', () => {
    beforeEach(async () => {
      const { readFileSync } = await import('node:fs');
      const mockedReadFileSync = jest.mocked(readFileSync);
      mockedReadFileSync.mockClear();

      mockedReadFileSync.mockImplementation(() => {
        throw new Error('oops');
      });
    });

    it('should return an empty array', async () => {
      const { getPackagePatterns } = await import('./getPackagePatterns.ts');
      expect(getPackagePatterns(PackageManager.PNPM)).toEqual([]);
    });
  });
});
