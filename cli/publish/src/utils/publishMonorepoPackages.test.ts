import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import { PackageManager } from '@repodog/cli-utils';

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  getMonorepoPackageMeta: jest.fn().mockReturnValue({
    alpha: { name: 'alpha', path: '/root/alpha/package.json' },
    bravo: { name: 'bravo', path: '/root/bravo/package.json' },
    charlie: { name: 'charlie', path: '/root/charlie/package.json' },
  }),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('./publishPackage.ts', () => ({
  publishPackage: jest.fn(),
}));

process.cwd = () => '/root';
const mockedProcessChdir = (process.chdir = jest.fn());

describe('publishMonorepoPackages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when packages are published successfully', () => {
    let publishPackage: jest.Mocked<typeof import('./publishPackage.ts')['publishPackage']>;

    beforeEach(async () => {
      ({ publishPackage } = jest.mocked(await import('./publishPackage.ts')));
    });

    it('should change current working directory correctly', async () => {
      const { publishMonorepoPackages } = await import('./publishMonorepoPackages.ts');
      publishMonorepoPackages(PackageManager.NPM);

      expect(mockedProcessChdir.mock.calls).toEqual([['/root/alpha'], ['/root/bravo'], ['/root/charlie'], ['/root']]);
    });

    it('should call publishPackage with the correct arguments', async () => {
      const { publishMonorepoPackages } = await import('./publishMonorepoPackages.ts');
      publishMonorepoPackages(PackageManager.NPM);

      expect(publishPackage.mock.calls).toEqual([
        ['/root/alpha/package.json', { packageManager: PackageManager.NPM }],
        ['/root/bravo/package.json', { packageManager: PackageManager.NPM }],
        ['/root/charlie/package.json', { packageManager: PackageManager.NPM }],
      ]);
    });
  });

  describe('when there is an error publishing a package', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;
    let publishPackage: jest.Mocked<typeof import('./publishPackage.ts')['publishPackage']>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      ({ publishPackage } = jest.mocked(await import('./publishPackage.ts')));

      publishPackage.mockImplementation(path => {
        if (path.includes('bravo')) {
          throw new Error('oops');
        }
      });
    });

    it('should call publishPackage with the correct arguments', async () => {
      const { publishMonorepoPackages } = await import('./publishMonorepoPackages.ts');
      publishMonorepoPackages(PackageManager.NPM);

      expect(publishPackage.mock.calls).toEqual([
        ['/root/alpha/package.json', { packageManager: PackageManager.NPM }],
        ['/root/bravo/package.json', { packageManager: PackageManager.NPM }],
        ['/root/charlie/package.json', { packageManager: PackageManager.NPM }],
      ]);
    });

    it('should log the correct message', async () => {
      const { publishMonorepoPackages } = await import('./publishMonorepoPackages.ts');
      publishMonorepoPackages(PackageManager.NPM);
      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('Error publishing bravo: oops'));
    });
  });
});
