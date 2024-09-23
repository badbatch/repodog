import { jest } from '@jest/globals';

jest.unstable_mockModule('node:fs', () => ({
  readFileSync: jest.fn().mockReturnValue('{ "name": "alpha", "version": "1.0.0" }'),
}));

const { readFileSync } = jest.mocked(await import('node:fs'));

const { addPackageJsonToCache, clearPackageJsonCache, getCachedPackageJsons, loadPackageJson } = await import(
  './loadPackageJson.ts'
);

describe('loadPackageJson', () => {
  const packageJsonPath = '/root/alpha/package.json';
  const packagePath = '/root/alpha';
  const packageJson = { name: 'alpha', version: '1.0.0' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when there is a cached package.json', () => {
    describe('when the path is file path to package.json', () => {
      beforeEach(() => {
        clearPackageJsonCache();
        addPackageJsonToCache(packageJsonPath, packageJson);
      });

      it('should return the cached package.json', () => {
        expect(loadPackageJson(packageJsonPath)).toEqual(packageJson);
      });

      it('should not load the package.json', () => {
        loadPackageJson(packageJsonPath);
        expect(readFileSync).not.toHaveBeenCalled();
      });
    });

    describe('when the path is directory path to package', () => {
      beforeEach(() => {
        clearPackageJsonCache();
        addPackageJsonToCache(packageJsonPath, packageJson);
      });

      it('should return the cached package.json', () => {
        expect(loadPackageJson(packagePath)).toEqual(packageJson);
      });

      it('should not load the package.json', () => {
        loadPackageJson(packagePath);
        expect(readFileSync).not.toHaveBeenCalled();
      });
    });
  });

  describe('when there is an error loading the package.json', () => {
    beforeEach(() => {
      clearPackageJsonCache();

      readFileSync.mockImplementationOnce(() => {
        throw new Error('oops');
      });
    });

    it('should throw the correct error', () => {
      expect(() => loadPackageJson(packageJsonPath)).toThrow(
        new Error(`Could not resolve the package.json at: ${packageJsonPath}`),
      );
    });
  });

  describe('when the package.json name is missing', () => {
    beforeEach(() => {
      clearPackageJsonCache();
      readFileSync.mockReturnValueOnce('{ "version": "1.0.0" }');
    });

    it('should throw the correct error', () => {
      expect(() => loadPackageJson(packageJsonPath)).toThrow(
        new Error(`Expected the package.json at "${packageJsonPath}" to have a name`),
      );
    });
  });

  describe('when the package.json version is missing', () => {
    beforeEach(() => {
      clearPackageJsonCache();
      readFileSync.mockReturnValueOnce('{ "name": "alpha" }');
    });

    it('should throw the correct error', () => {
      expect(() => loadPackageJson(packageJsonPath)).toThrow(
        new Error(`Expected the package.json at "${packageJsonPath}" to have a version`),
      );
    });
  });

  describe('when the package.json name and version are present', () => {
    beforeEach(() => {
      clearPackageJsonCache();
    });

    it('should return the package.json', () => {
      expect(loadPackageJson(packageJsonPath)).toEqual(packageJson);
    });

    it('should cache the package.json', () => {
      loadPackageJson(packageJsonPath);
      expect(getCachedPackageJsons()).toEqual({ [packageJsonPath]: packageJson });
    });
  });
});
