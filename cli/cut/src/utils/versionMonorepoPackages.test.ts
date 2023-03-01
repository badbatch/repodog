import { jest } from '@jest/globals';
import { loadPackageJsonMock } from '@repodog/cli-test-utils';
import { PackageManager, type ReleaseMeta, getInternalDependencies } from '@repodog/cli-utils';
import type { PackageJson, SetRequired } from 'type-fest';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  formatListLogMessage: jest.fn().mockImplementation(message => message),
  getChangedFiles: jest
    .fn()
    .mockReturnValue(['apps/client/alpha/src/index.ts', 'configs/delta/README.md', 'configs/delta/src/index.ts']),
  getInternalDependencies,
  getLastReleaseTag: jest.fn().mockReturnValue('1.0.0'),
  getMonorepoPackageMeta: jest.fn().mockImplementation(() => ({
    alpha: {
      force: false,
      name: 'alpha',
      path: '/root/apps/client/alpha/package.json',
      versioned: false,
    },
    bravo: {
      force: false,
      name: 'bravo',
      path: '/root/apps/server/bravo/package.json',
      versioned: false,
    },
    delta: {
      force: false,
      name: 'delta',
      path: '/root/configs/delta/package.json',
      versioned: false,
    },
    echo: {
      force: false,
      name: 'echo',
      path: '/root/configs/echo/package.json',
      versioned: false,
    },
  })),
  verboseLog: jest.fn(),
  ...loadPackageJsonMock(),
}));

jest.unstable_mockModule('./versionPackage.js', () => ({
  versionPackage: jest.fn(),
}));

process.cwd = jest.fn().mockReturnValue('/root') as jest.Mocked<() => string>;

describe('versionMonorepoPackages', () => {
  describe('when force is false', () => {
    let mockedVersionPackage: jest.MockedFunction<
      (
        packageJson: SetRequired<PackageJson, 'name' | 'version'>,
        meta: Pick<ReleaseMeta, 'packageJsonPath' | 'preReleaseId' | 'tag' | 'type'>
      ) => void
    >;

    beforeEach(async () => {
      const { versionPackage } = await import('./versionPackage.js');
      mockedVersionPackage = jest.mocked(versionPackage);
      mockedVersionPackage.mockClear();
    });

    it('should version packages in which files have changed since last tag', async () => {
      const { versionMonorepoPackages } = await import('./versionMonorepoPackages.js');
      versionMonorepoPackages({ force: false, packageManager: PackageManager.NPM, type: 'major' });

      expect(mockedVersionPackage.mock.calls).toEqual([
        [
          { name: 'delta', publishConfig: { access: 'public' }, version: '1.0.0' },
          {
            packageJsonPath: '/root/configs/delta/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
        [
          { name: 'alpha', publishConfig: { access: 'public' }, version: '1.0.0' },
          {
            packageJsonPath: '/root/apps/client/alpha/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
      ]);
    });
  });

  describe('when force is true', () => {
    let mockedVersionPackage: jest.MockedFunction<
      (
        packageJson: SetRequired<PackageJson, 'name' | 'version'>,
        meta: Pick<ReleaseMeta, 'packageJsonPath' | 'preReleaseId' | 'tag' | 'type'>
      ) => void
    >;

    beforeEach(async () => {
      const { versionPackage } = await import('./versionPackage.js');
      mockedVersionPackage = jest.mocked(versionPackage);
      mockedVersionPackage.mockClear();
    });

    it('should version packages regardless of whether files have changed', async () => {
      const { versionMonorepoPackages } = await import('./versionMonorepoPackages.js');
      versionMonorepoPackages({ force: true, packageManager: PackageManager.NPM, type: 'major' });

      expect(mockedVersionPackage.mock.calls).toEqual([
        [
          { name: 'echo', publishConfig: { access: 'public' }, version: '1.0.0' },
          {
            packageJsonPath: '/root/configs/echo/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
        [
          { name: 'delta', publishConfig: { access: 'public' }, version: '1.0.0' },
          {
            packageJsonPath: '/root/configs/delta/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
        [
          { name: 'bravo', publishConfig: { access: 'public' }, version: '1.0.0' },
          {
            packageJsonPath: '/root/apps/server/bravo/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
        [
          { name: 'alpha', publishConfig: { access: 'public' }, version: '1.0.0' },
          {
            packageJsonPath: '/root/apps/client/alpha/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
      ]);
    });
  });

  describe('when versioned package has internal dependencies', () => {
    let mockedVersionPackage: jest.MockedFunction<
      (
        packageJson: SetRequired<PackageJson, 'name' | 'version'>,
        meta: Pick<ReleaseMeta, 'packageJsonPath' | 'preReleaseId' | 'tag' | 'type'>
      ) => void
    >;

    beforeEach(async () => {
      const { loadPackageJson } = await import('@repodog/cli-utils');
      const mockedLoadPackageJson = jest.mocked(loadPackageJson);
      mockedLoadPackageJson.mockClear();

      mockedLoadPackageJson.mockImplementation((path): SetRequired<PackageJson, 'name' | 'version'> => {
        const match = /\/([a-z]+)\/package.json$/.exec(path)!;
        const name = match[1]!;

        if (name === 'alpha') {
          return { name, peerDependencies: { echo: '< 2' }, version: '1.0.0' };
        }

        if (name === 'delta') {
          return { name, peerDependencies: { bravo: '< 2' }, version: '1.0.0' };
        }

        return { name, version: '1.0.0' };
      });

      const { versionPackage } = await import('./versionPackage.js');
      mockedVersionPackage = jest.mocked(versionPackage);
      mockedVersionPackage.mockClear();
    });

    it('should version the internal dependency packages regardless of whether their files have changed', async () => {
      const { versionMonorepoPackages } = await import('./versionMonorepoPackages.js');
      versionMonorepoPackages({ force: false, packageManager: PackageManager.NPM, type: 'major' });

      expect(mockedVersionPackage.mock.calls).toEqual([
        [
          { name: 'delta', peerDependencies: { bravo: '< 2' }, version: '1.0.0' },
          {
            packageJsonPath: '/root/configs/delta/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
        [
          { name: 'bravo', version: '1.0.0' },
          {
            packageJsonPath: '/root/apps/server/bravo/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
        [
          { name: 'alpha', peerDependencies: { echo: '< 2' }, version: '1.0.0' },
          {
            packageJsonPath: '/root/apps/client/alpha/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
        [
          { name: 'echo', version: '1.0.0' },
          {
            packageJsonPath: '/root/configs/echo/package.json',
            preReleaseId: undefined,
            tag: undefined,
            type: 'major',
          },
        ],
      ]);
    });
  });
});
