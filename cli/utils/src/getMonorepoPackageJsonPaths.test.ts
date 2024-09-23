import { jest } from '@jest/globals';
import { globMock } from '@repodog/cli-test-utils';
import { PackageManager } from './types.ts';

jest.unstable_mockModule('glob', globMock);

jest.unstable_mockModule('./getPackagePatterns.ts', () => ({
  getPackagePatterns: jest.fn().mockReturnValue(['apps/**', 'configs/*', 'graphql/*', '!apps/shared/test-utils']),
}));

const { glob } = jest.mocked(await import('glob'));
const { getMonorepoPackageJsonPaths } = await import('./getMonorepoPackageJsonPaths.ts');

describe('getMonorepoPackageJsonPaths', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // @ts-expect-error signature overload mismatch
    glob.sync.mockImplementation(pattern => {
      switch (pattern) {
        case 'apps/**/package.json': {
          return [
            '/root/apps/client/alpha/package.json',
            '/root/apps/server/bravo/package.json',
            '/root/apps/shared/test-utils/package.json',
          ];
        }

        case 'configs/*/package.json': {
          return ['/root/configs/delta/package.json', '/root/configs/echo/package.json'];
        }

        case 'graphql/*/package.json': {
          return [
            '/root/graphql/foxtrot/package.json',
            '/root/graphql/golf/package.json',
            '/root/graphql/hotel/package.json',
          ];
        }

        case 'apps/shared/test-utils/package.json': {
          return ['/root/apps/shared/test-utils/package.json'];
        }

        default: {
          return [];
        }
      }
    });
  });

  it('should return the correct package.json paths', () => {
    expect(getMonorepoPackageJsonPaths(PackageManager.PNPM)).toEqual([
      '/root/apps/client/alpha/package.json',
      '/root/apps/server/bravo/package.json',
      '/root/configs/delta/package.json',
      '/root/configs/echo/package.json',
      '/root/graphql/foxtrot/package.json',
      '/root/graphql/golf/package.json',
      '/root/graphql/hotel/package.json',
    ]);
  });
});
