import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import { PackageManager, type ReleaseMeta } from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  getMonorepoPackageMeta: jest.fn().mockReturnValue({
    alpha: { name: 'alpha', path: '/root/alpha/package.json' },
    bravo: { name: 'bravo', path: '/root/bravo/package.json' },
    charlie: { name: 'charlie', path: '/root/charlie/package.json' },
  }),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('./publishPackage.ts', () => ({
  publishPackage: jest
    .fn<(path: string, options: Pick<ReleaseMeta, 'packageManager'>, callback: () => void) => Promise<void>>()
    .mockImplementation((_packageJsonPath, _options, callback) => {
      callback();
      return Promise.resolve();
    }),
}));

process.cwd = () => '/root';
const mockedProcessChdir = (process.chdir = jest.fn());
const shelljs = jest.mocked(await import('shelljs')).default;
const { publishPackage } = jest.mocked(await import('./publishPackage.ts'));
const { publishMonorepoPackages } = await import('./publishMonorepoPackages.ts');

describe('publishMonorepoPackages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when packages are published successfully', () => {
    it('should change current working directory correctly', async () => {
      await publishMonorepoPackages(PackageManager.NPM);

      expect(mockedProcessChdir.mock.calls).toEqual([
        ['/root/alpha'],
        ['/root'],
        ['/root/bravo'],
        ['/root'],
        ['/root/charlie'],
        ['/root'],
      ]);
    });

    it('should call publishPackage with the correct arguments', async () => {
      await publishMonorepoPackages(PackageManager.NPM);

      expect(publishPackage.mock.calls).toEqual([
        ['/root/alpha/package.json', { packageManager: PackageManager.NPM }, expect.any(Function)],
        ['/root/bravo/package.json', { packageManager: PackageManager.NPM }, expect.any(Function)],
        ['/root/charlie/package.json', { packageManager: PackageManager.NPM }, expect.any(Function)],
      ]);
    });
  });

  describe('when there is an error publishing a package', () => {
    beforeEach(() => {
      publishPackage.mockImplementation(path => {
        if (path.includes('bravo')) {
          throw new Error('oops');
        }

        return Promise.resolve();
      });
    });

    it('should call publishPackage with the correct arguments', async () => {
      try {
        await publishMonorepoPackages(PackageManager.NPM);
      } catch {
        // no catch
      }

      expect(publishPackage.mock.calls).toEqual([
        ['/root/alpha/package.json', { packageManager: PackageManager.NPM }, expect.any(Function)],
        ['/root/bravo/package.json', { packageManager: PackageManager.NPM }, expect.any(Function)],
      ]);
    });

    it('should log the correct message', async () => {
      try {
        await publishMonorepoPackages(PackageManager.NPM);
      } catch {
        // no catch
      }

      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('Error publishing bravo: oops'));
    });
  });
});
