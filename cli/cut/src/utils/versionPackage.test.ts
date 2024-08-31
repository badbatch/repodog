import { jest } from '@jest/globals';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  getLatestPackageVersionOnNpm: jest.fn().mockReturnValue('1.0.0'),
  getNewVersion: jest.fn().mockReturnValue('1.1.0'),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('node:fs', () => ({
  writeFileSync: jest.fn(),
}));

describe('versionPackage', () => {
  const packageJsonPath = '/root/alpha/package.json';
  const packageJson = { name: 'alpha', version: '1.0.0' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the new version is invalid', () => {
    beforeEach(async () => {
      const { getNewVersion } = jest.mocked(await import('@repodog/cli-utils'));
      getNewVersion.mockReturnValueOnce(null); // eslint-disable-line unicorn/no-null
    });

    it('should throw the correct error', async () => {
      const { versionPackage } = await import('./versionPackage.ts');

      expect(() => {
        versionPackage(packageJson, { packageJsonPath, type: 'minor' });
      }).toThrow(new Error('The new package verison for a minor increment on 1.0.0 is invalid'));
    });
  });

  describe('when the new version is equal to the latest version on npm', () => {
    beforeEach(async () => {
      const { getLatestPackageVersionOnNpm } = jest.mocked(await import('@repodog/cli-utils'));
      getLatestPackageVersionOnNpm.mockReturnValueOnce('1.1.0');
    });

    it('should throw the correct error', async () => {
      const { versionPackage } = await import('./versionPackage.ts');

      expect(() => {
        versionPackage(packageJson, { packageJsonPath, type: 'minor' });
      }).toThrow(new Error('The new alpha package verison 1.1.0 is equal to a version on npm: 1.1.0.'));
    });
  });

  describe('when there is no latest version on npm', () => {
    let writeFileSync: jest.Mocked<(typeof import('node:fs'))['writeFileSync']>;

    beforeEach(async () => {
      const { getLatestPackageVersionOnNpm } = jest.mocked(await import('@repodog/cli-utils'));
      getLatestPackageVersionOnNpm.mockReturnValueOnce('');
      ({ writeFileSync } = jest.mocked(await import('node:fs')));
    });

    it('should writeFileSync with the correct arguments', async () => {
      const { versionPackage } = await import('./versionPackage.ts');
      versionPackage(packageJson, { packageJsonPath, type: 'minor' });

      expect(writeFileSync).toHaveBeenCalledWith(
        packageJsonPath,
        `${JSON.stringify({ ...packageJson, version: '1.1.0' }, undefined, 2)}\n`,
      );
    });
  });

  describe('when the new version is less than the latest version on npm', () => {
    let writeFileSync: jest.Mocked<(typeof import('node:fs'))['writeFileSync']>;

    beforeEach(async () => {
      const { getLatestPackageVersionOnNpm } = jest.mocked(await import('@repodog/cli-utils'));
      getLatestPackageVersionOnNpm.mockReturnValueOnce('2.0.0');
      ({ writeFileSync } = jest.mocked(await import('node:fs')));
    });

    it('should writeFileSync with the correct arguments', async () => {
      const { versionPackage } = await import('./versionPackage.ts');
      versionPackage(packageJson, { packageJsonPath, type: 'minor' });

      expect(writeFileSync).toHaveBeenCalledWith(
        packageJsonPath,
        `${JSON.stringify({ ...packageJson, version: '1.1.0' }, undefined, 2)}\n`,
      );
    });
  });

  describe('when the new version is greater than the latest version on npm', () => {
    let writeFileSync: jest.Mocked<(typeof import('node:fs'))['writeFileSync']>;

    beforeEach(async () => {
      ({ writeFileSync } = jest.mocked(await import('node:fs')));
    });

    it('should writeFileSync with the correct arguments', async () => {
      const { versionPackage } = await import('./versionPackage.ts');
      versionPackage(packageJson, { packageJsonPath, type: 'minor' });

      expect(writeFileSync).toHaveBeenCalledWith(
        packageJsonPath,
        `${JSON.stringify({ ...packageJson, version: '1.1.0' }, undefined, 2)}\n`,
      );
    });
  });

  describe('when there is an exception throw writing the package.json', () => {
    beforeEach(async () => {
      const { writeFileSync } = jest.mocked(await import('node:fs'));

      writeFileSync.mockImplementationOnce(() => {
        throw new Error('oops');
      });
    });

    it('should throw the correct error', async () => {
      const { versionPackage } = await import('./versionPackage.ts');

      expect(() => {
        versionPackage(packageJson, { packageJsonPath, type: 'minor' });
      }).toThrow(new Error('Could not write the package.json to: /root/alpha/package.json'));
    });
  });
});
