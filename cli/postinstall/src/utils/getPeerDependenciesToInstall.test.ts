import { jest } from '@jest/globals';

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

describe('getPeerDependenciesToInstall', () => {
  describe('when a package.json cannot be found', () => {
    it('should return an empty tuples array', async () => {
      jest.clearAllMocks();
      const { getPeerDependenciesToInstall } = await import('./getPeerDependenciesToInstall.ts');
      await expect(getPeerDependenciesToInstall('@repodog/charlie')).resolves.toEqual([]);
    });
  });

  describe('when a package.json has no peerDependencies', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should return an empty tuples array', async () => {
      jest.clearAllMocks();
      const { getPeerDependenciesToInstall } = await import('./getPeerDependenciesToInstall.ts');
      await expect(getPeerDependenciesToInstall('@repodog/bravo')).resolves.toEqual([]);
    });
  });

  describe('when a package.json has peerDependencies', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should return a populated tuples array', async () => {
      jest.clearAllMocks();
      const { getPeerDependenciesToInstall } = await import('./getPeerDependenciesToInstall.ts');

      await expect(getPeerDependenciesToInstall('@repodog/alpha')).resolves.toEqual([
        ['alpha-0', '<5'],
        ['alpha-1', '<10'],
        ['alpha-2', '<3'],
      ]);
    });
  });
});
