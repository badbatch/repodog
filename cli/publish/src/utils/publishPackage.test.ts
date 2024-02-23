import { jest } from '@jest/globals';
import { loadPackageJsonMock, shelljsMock } from '@repodog/cli-test-utils';
import { PackageManager } from '@repodog/cli-utils';

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  getLatestPackageVersionOnNpm: jest.fn(),
  getTag: jest.fn(),
  verboseLog: jest.fn(),
  ...loadPackageJsonMock(),
}));

jest.unstable_mockModule('./getPublishCmd.ts', () => ({
  getPublishCmd: jest.fn(),
}));

describe('publishPackage', () => {
  const packageJsonPath = '/root/alpha/package.json';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when package publishConfig.access is not public', () => {
    let getLatestPackageVersionOnNpm: jest.Mocked<typeof import('@repodog/cli-utils')['getLatestPackageVersionOnNpm']>;

    beforeEach(async () => {
      let loadPackageJson: jest.Mocked<typeof import('@repodog/cli-utils')['loadPackageJson']>;
      ({ getLatestPackageVersionOnNpm, loadPackageJson } = jest.mocked(await import('@repodog/cli-utils')));

      loadPackageJson.mockReturnValueOnce({
        name: 'alpha',
        version: '1.0.0',
      });
    });

    it('should not call getLatestPackageVersionOnNpm', async () => {
      const { publishPackage } = await import('./publishPackage.ts');
      publishPackage(packageJsonPath, { packageManager: PackageManager.NPM });
      expect(getLatestPackageVersionOnNpm).not.toHaveBeenCalled();
    });
  });

  describe('when package version is less than the latest version on npm', () => {
    beforeEach(async () => {
      const { getLatestPackageVersionOnNpm } = jest.mocked(await import('@repodog/cli-utils'));
      getLatestPackageVersionOnNpm.mockReturnValueOnce('2.0.0');
    });

    it('should throw the correct error', async () => {
      const { publishPackage } = await import('./publishPackage.ts');

      expect(() => publishPackage(packageJsonPath, { packageManager: PackageManager.NPM })).toThrow(
        new Error('The new alpha package verison 1.0.0 is less than the lastest version on npm: 2.0.0')
      );
    });
  });

  describe('when package version is equal to the latest version on npm', () => {
    let verboseLog: jest.Mocked<typeof import('@repodog/cli-utils')['verboseLog']>;

    beforeEach(async () => {
      let getLatestPackageVersionOnNpm: jest.Mocked<
        typeof import('@repodog/cli-utils')['getLatestPackageVersionOnNpm']
      >;

      ({ getLatestPackageVersionOnNpm, verboseLog } = jest.mocked(await import('@repodog/cli-utils')));
      getLatestPackageVersionOnNpm.mockReturnValueOnce('1.0.0');
    });

    it('should throw the correct error', async () => {
      const { publishPackage } = await import('./publishPackage.ts');
      publishPackage(packageJsonPath, { packageManager: PackageManager.NPM });

      expect(verboseLog).toHaveBeenCalledWith(
        'The new alpha package verison 1.0.0 is equal to the lastest version on npm: 1.0.0. Skipping publish.'
      );
    });
  });

  describe('when there is no latest version on npm', () => {
    let getPublishCmd: jest.Mocked<typeof import('./getPublishCmd.ts')['getPublishCmd']>;

    beforeEach(async () => {
      const { getLatestPackageVersionOnNpm } = jest.mocked(await import('@repodog/cli-utils'));
      getLatestPackageVersionOnNpm.mockReturnValueOnce('');
      ({ getPublishCmd } = jest.mocked(await import('./getPublishCmd.ts')));
    });

    it('should run the correct publish command', async () => {
      const { publishPackage } = await import('./publishPackage.ts');
      publishPackage(packageJsonPath, { packageManager: PackageManager.NPM });
      expect(getPublishCmd).toHaveBeenCalledWith(PackageManager.NPM, '1.0.0', undefined);
    });
  });

  describe('when package version is greater than the latest version on npm', () => {
    let getPublishCmd: jest.Mocked<typeof import('./getPublishCmd.ts')['getPublishCmd']>;

    beforeEach(async () => {
      const { getLatestPackageVersionOnNpm } = jest.mocked(await import('@repodog/cli-utils'));
      getLatestPackageVersionOnNpm.mockReturnValueOnce('0.5.0');
      ({ getPublishCmd } = jest.mocked(await import('./getPublishCmd.ts')));
    });

    it('should run the correct publish command', async () => {
      const { publishPackage } = await import('./publishPackage.ts');
      publishPackage(packageJsonPath, { packageManager: PackageManager.NPM });
      expect(getPublishCmd).toHaveBeenCalledWith(PackageManager.NPM, '1.0.0', undefined);
    });
  });
});
