import { jest } from '@jest/globals';
import { loadPackageJsonMock } from '@repodog/cli-test-utils';
import { PackageManager } from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  asyncExec: jest.fn(),
  getLatestPackageVersionOnNpm: jest.fn(),
  getTag: jest.fn(),
  verboseLog: jest.fn(),
  ...loadPackageJsonMock(),
}));

jest.unstable_mockModule('./getPublishCmd.ts', () => ({
  getPublishCmd: jest.fn(),
}));

const { getLatestPackageVersionOnNpm, loadPackageJson, verboseLog } = jest.mocked(await import('@repodog/cli-utils'));
const { getPublishCmd } = jest.mocked(await import('./getPublishCmd.ts'));
const { publishPackage } = await import('./publishPackage.ts');

describe('publishPackage', () => {
  const packageJsonPath = '/root/alpha/package.json';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when package publishConfig.access is not public', () => {
    beforeEach(() => {
      loadPackageJson.mockReturnValueOnce({
        name: 'alpha',
        version: '1.0.0',
      });
    });

    it('should not call getLatestPackageVersionOnNpm', async () => {
      await publishPackage(packageJsonPath, { packageManager: PackageManager.NPM });
      expect(getLatestPackageVersionOnNpm).not.toHaveBeenCalled();
    });
  });

  describe('when package version is equal to a version on npm', () => {
    beforeEach(() => {
      getLatestPackageVersionOnNpm.mockReturnValueOnce('1.0.0');
    });

    it('should throw the correct error', async () => {
      await publishPackage(packageJsonPath, { packageManager: PackageManager.NPM });

      expect(verboseLog).toHaveBeenCalledWith(
        'The new alpha package verison 1.0.0 is equal to a version on npm: 1.0.0. Skipping publish.',
      );
    });
  });

  describe('when there is no latest version on npm', () => {
    beforeEach(() => {
      getLatestPackageVersionOnNpm.mockReturnValueOnce('');
    });

    it('should run the correct publish command', async () => {
      await publishPackage(packageJsonPath, { packageManager: PackageManager.NPM });
      expect(getPublishCmd).toHaveBeenCalledWith(PackageManager.NPM, '1.0.0', undefined);
    });
  });

  describe('when package version is less than the latest version on npm', () => {
    beforeEach(() => {
      getLatestPackageVersionOnNpm.mockReturnValueOnce('2.0.0');
    });

    it('should throw the correct error', async () => {
      await publishPackage(packageJsonPath, { packageManager: PackageManager.NPM });
      expect(getPublishCmd).toHaveBeenCalledWith(PackageManager.NPM, '1.0.0', undefined);
    });
  });

  describe('when package version is greater than the latest version on npm', () => {
    beforeEach(() => {
      getLatestPackageVersionOnNpm.mockReturnValueOnce('0.5.0');
    });

    it('should run the correct publish command', async () => {
      await publishPackage(packageJsonPath, { packageManager: PackageManager.NPM });
      expect(getPublishCmd).toHaveBeenCalledWith(PackageManager.NPM, '1.0.0', undefined);
    });
  });
});
