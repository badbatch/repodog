import { jest } from '@jest/globals';
import { loadPackageJsonMock } from '@repodog/cli-test-utils';
import { PackageManager } from './types.js';

jest.unstable_mockModule('./getMonorepoPackageJsonPaths.js', () => ({
  getMonorepoPackageJsonPaths: jest
    .fn()
    .mockReturnValue([
      '/root/apps/client/alpha/package.json',
      '/root/apps/server/bravo/package.json',
      '/root/configs/delta/package.json',
    ]),
}));

jest.unstable_mockModule('./loadPackageJson.js', loadPackageJsonMock);

describe('getMonorepoPackageMeta', () => {
  it('should return the correct package meta', async () => {
    const { getMonorepoPackageMeta } = await import('./getMonorepoPackageMeta.js');

    expect(getMonorepoPackageMeta(PackageManager.PNPM)).toEqual({
      alpha: {
        checked: false,
        force: false,
        name: 'alpha',
        path: '/root/apps/client/alpha/package.json',
        versioned: false,
      },
      bravo: {
        checked: false,
        force: false,
        name: 'bravo',
        path: '/root/apps/server/bravo/package.json',
        versioned: false,
      },
      delta: {
        checked: false,
        force: false,
        name: 'delta',
        path: '/root/configs/delta/package.json',
        versioned: false,
      },
    });
  });
});
