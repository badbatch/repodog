import { jest } from '@jest/globals';

jest.unstable_mockModule('node:fs', () => ({
  readFileSync: jest.fn().mockReturnValue('{ "name": "alpha", "version": "1.0.0" }'),
}));

describe('loadPackageJson', () => {
  const packageJsonPath = '/root/alpha/package.json';
  const packagePath = '/root/alpha';
  const packageJson = { name: 'alpha', version: '1.0.0' };

  describe('when there is a cached package.json', () => {
    describe('when the path is file path to package.json', () => {
      let readFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

      beforeEach(async () => {
        jest.clearAllMocks();
        const { addPackageJsonToCache, clearPackageJsonCache } = await import('./loadPackageJson.ts');
        clearPackageJsonCache();
        addPackageJsonToCache(packageJsonPath, packageJson);
        ({ readFileSync } = jest.mocked(await import('node:fs')));
      });

      it('should return the cached package.json', async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        expect(loadPackageJson(packageJsonPath)).toEqual(packageJson);
      });

      it('should not load the package.json', async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        loadPackageJson(packageJsonPath);
        expect(readFileSync).not.toHaveBeenCalled();
      });
    });

    describe('when the path is directory path to package', () => {
      let readFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

      beforeEach(async () => {
        jest.clearAllMocks();
        const { addPackageJsonToCache, clearPackageJsonCache } = await import('./loadPackageJson.ts');
        clearPackageJsonCache();
        addPackageJsonToCache(packageJsonPath, packageJson);
        ({ readFileSync } = jest.mocked(await import('node:fs')));
      });

      it('should return the cached package.json', async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        expect(loadPackageJson(packagePath)).toEqual(packageJson);
      });

      it('should not load the package.json', async () => {
        const { loadPackageJson } = await import('./loadPackageJson.ts');
        loadPackageJson(packagePath);
        expect(readFileSync).not.toHaveBeenCalled();
      });
    });
  });

  describe('when there is an error loading the package.json', () => {
    let readFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      const { clearPackageJsonCache } = await import('./loadPackageJson.ts');
      clearPackageJsonCache();
      ({ readFileSync } = jest.mocked(await import('node:fs')));

      readFileSync.mockImplementationOnce(() => {
        throw new Error('oops');
      });
    });

    it('should throw the correct error', async () => {
      const { loadPackageJson } = await import('./loadPackageJson.ts');

      expect(() => loadPackageJson(packageJsonPath)).toThrow(
        new Error(`Could not resolve the package.json at: ${packageJsonPath}`)
      );
    });
  });

  describe('when the package.json name is missing', () => {
    let readFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      const { clearPackageJsonCache } = await import('./loadPackageJson.ts');
      clearPackageJsonCache();
      ({ readFileSync } = jest.mocked(await import('node:fs')));
      readFileSync.mockReturnValueOnce('{ "version": "1.0.0" }');
    });

    it('should throw the correct error', async () => {
      const { loadPackageJson } = await import('./loadPackageJson.ts');

      expect(() => loadPackageJson(packageJsonPath)).toThrow(
        new Error(`Expected the package.json at "${packageJsonPath}" to have a name`)
      );
    });
  });

  describe('when the package.json version is missing', () => {
    let readFileSync: jest.Mocked<typeof import('node:fs')['readFileSync']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      const { clearPackageJsonCache } = await import('./loadPackageJson.ts');
      clearPackageJsonCache();
      ({ readFileSync } = jest.mocked(await import('node:fs')));
      readFileSync.mockReturnValueOnce('{ "name": "alpha" }');
    });

    it('should throw the correct error', async () => {
      const { loadPackageJson } = await import('./loadPackageJson.ts');

      expect(() => loadPackageJson(packageJsonPath)).toThrow(
        new Error(`Expected the package.json at "${packageJsonPath}" to have a version`)
      );
    });
  });

  describe('when the package.json name and version are present', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      const { clearPackageJsonCache } = await import('./loadPackageJson.ts');
      clearPackageJsonCache();
    });

    it('should return the package.json', async () => {
      const { loadPackageJson } = await import('./loadPackageJson.ts');
      expect(loadPackageJson(packageJsonPath)).toEqual(packageJson);
    });

    it('should cache the package.json', async () => {
      const { getCachedPackageJsons, loadPackageJson } = await import('./loadPackageJson.ts');
      loadPackageJson(packageJsonPath);
      expect(getCachedPackageJsons()).toEqual({ [packageJsonPath]: packageJson });
    });
  });
});
