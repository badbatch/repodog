import { jest } from '@jest/globals';
import { type AbbreviatedMetadata } from 'package-json';

jest.unstable_mockModule(
  '@repodog/alpha/package.json',
  () => ({
    default: {
      name: '@repodog/alpha',
      peerDependencies: {
        'alpha-0': '<5',
        'alpha-1': '<10',
        'alpha-2': '<3',
      },
      version: '0.0.1',
    },
  }),
  { virtual: true }
);

jest.unstable_mockModule(
  '@repodog/bravo/package.json',
  () => ({
    default: {
      name: '@repodog/bravo',
      version: '0.0.1',
    },
  }),
  { virtual: true }
);

jest.unstable_mockModule('package-json', () => ({
  // eslint-disable-next-line unicorn/no-useless-undefined
  default: jest.fn<() => Promise<undefined>>().mockResolvedValue(undefined),
}));

jest.unstable_mockModule('./getLatestCompatibleVersion.ts', () => ({
  getLatestCompatibleVersion: jest
    .fn<(name: string, semver: string) => string | undefined>()
    .mockImplementation((_peer, semver) => `^${Number(semver.slice(1)) - 1}.0.0`),
}));

describe('getPeerDependenciesToInstall', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when a package.json cannot be found', () => {
    it('should return an empty tuples array', async () => {
      const { getPeerDependenciesToInstall } = await import('./getPeerDependenciesToInstall.ts');
      await expect(getPeerDependenciesToInstall('@repodog/charlie')).resolves.toEqual([]);
    });
  });

  describe('when a package.json has no peerDependencies', () => {
    it('should return an empty tuples array', async () => {
      const { default: getPackageJsonFromNpmRegistry } = jest.mocked(await import('package-json'));
      getPackageJsonFromNpmRegistry.mockResolvedValueOnce({} as AbbreviatedMetadata);
      const { getPeerDependenciesToInstall } = await import('./getPeerDependenciesToInstall.ts');
      await expect(getPeerDependenciesToInstall('@repodog/bravo')).resolves.toEqual([]);
    });
  });

  describe('when a package.json has peerDependencies', () => {
    it('should return a populated tuples array', async () => {
      const { default: getPackageJsonFromNpmRegistry } = jest.mocked(await import('package-json'));

      getPackageJsonFromNpmRegistry.mockResolvedValueOnce({
        peerDependencies: {
          'alpha-0': '<5',
          'alpha-1': '<10',
          'alpha-2': '<3',
        },
      } as unknown as AbbreviatedMetadata);

      const { getPeerDependenciesToInstall } = await import('./getPeerDependenciesToInstall.ts');

      await expect(getPeerDependenciesToInstall('@repodog/alpha')).resolves.toEqual([
        ['alpha-0', '^4.0.0'],
        ['alpha-1', '^9.0.0'],
        ['alpha-2', '^2.0.0'],
      ]);
    });
  });
});
