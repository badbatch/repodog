import { jest } from '@jest/globals';
import { loadPackageJsonMock } from '@repodog/cli-test-utils';
import { PackageManager } from './types.ts';

jest.unstable_mockModule('./getMonorepoPackageJsonPaths.ts', () => ({
  getMonorepoPackageJsonPaths: jest
    .fn()
    .mockReturnValue([
      '/root/apps/client/alpha/package.json',
      '/root/apps/server/bravo/package.json',
      '/root/configs/delta/package.json',
    ]),
}));

jest.unstable_mockModule('./loadPackageJson.ts', loadPackageJsonMock);
const { getMonorepoPackageMeta } = await import('./getMonorepoPackageMeta.ts');

describe('getMonorepoPackageMeta', () => {
  it('should return the correct package meta', () => {
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
