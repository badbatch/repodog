import { jest } from '@jest/globals';
import { clearShelljsMock, shelljsMock } from '@repodog/cli-test-utils';
import { PackageManager, type ReleaseMeta } from '@repodog/cli-utils';

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  getMonorepoPackageMeta: jest.fn().mockReturnValue({
    alpha: { name: 'alpha', path: '/root/alpha/package.json' },
    bravo: { name: 'bravo', path: '/root/bravo/package.json' },
    charlie: { name: 'charlie', path: '/root/charlie/package.json' },
  }),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('./publishPackage.js', () => ({
  publishPackage: jest.fn(),
}));

process.cwd = () => '/root';
const mockedProcessChdir = (process.chdir = jest.fn());

describe('publishMonorepoPackages', () => {
  describe('when packages are published successfully', () => {
    let mockedPublishPackage: jest.MockedFunction<
      (packageJsonPath: string, { packageManager }: Pick<ReleaseMeta, 'packageManager'>) => void
    >;

    beforeEach(async () => {
      const shelljs = jest.mocked(await import('shelljs')).default;
      clearShelljsMock(shelljs);

      const { publishPackage } = await import('./publishPackage.js');
      mockedPublishPackage = jest.mocked(publishPackage);
      mockedPublishPackage.mockClear();

      mockedProcessChdir.mockClear();
    });

    it('should change current working directory correctly', async () => {
      const { publishMonorepoPackages } = await import('./publishMonorepoPackages.js');
      publishMonorepoPackages(PackageManager.NPM);
      expect(mockedProcessChdir.mock.calls).toEqual([['/root/alpha'], ['/root/bravo'], ['/root/charlie'], ['/root']]);
    });

    it('should call publishPackage with the correct arguments', async () => {
      const { publishMonorepoPackages } = await import('./publishMonorepoPackages.js');
      publishMonorepoPackages(PackageManager.NPM);

      expect(mockedPublishPackage.mock.calls).toEqual([
        ['/root/alpha/package.json', { packageManager: PackageManager.NPM }],
        ['/root/bravo/package.json', { packageManager: PackageManager.NPM }],
        ['/root/charlie/package.json', { packageManager: PackageManager.NPM }],
      ]);
    });
  });

  describe('when there is an error publishing a package', () => {
    let shelljs: jest.MockedObject<typeof import('shelljs')>;

    let mockedPublishPackage: jest.MockedFunction<
      (packageJsonPath: string, { packageManager }: Pick<ReleaseMeta, 'packageManager'>) => void
    >;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      clearShelljsMock(shelljs);

      const { publishPackage } = await import('./publishPackage.js');
      mockedPublishPackage = jest.mocked(publishPackage);
      mockedPublishPackage.mockClear();

      mockedPublishPackage.mockImplementation(path => {
        if (path.includes('bravo')) {
          throw new Error('oops');
        }
      });
    });

    it('should call publishPackage with the correct arguments', async () => {
      const { publishMonorepoPackages } = await import('./publishMonorepoPackages.js');
      publishMonorepoPackages(PackageManager.NPM);

      expect(mockedPublishPackage.mock.calls).toEqual([
        ['/root/alpha/package.json', { packageManager: PackageManager.NPM }],
        ['/root/bravo/package.json', { packageManager: PackageManager.NPM }],
        ['/root/charlie/package.json', { packageManager: PackageManager.NPM }],
      ]);
    });

    it('should log the correct message', async () => {
      const { publishMonorepoPackages } = await import('./publishMonorepoPackages.js');
      publishMonorepoPackages(PackageManager.NPM);
      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('Error publishing bravo: oops'));
    });
  });
});
