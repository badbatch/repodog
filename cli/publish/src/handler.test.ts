import { jest } from '@jest/globals';
import { clearShelljsMock, shelljsMock } from '@repodog/cli-test-utils';
import type { PackageManager, ReleaseMeta } from '@repodog/cli-utils';

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  calculateDuration: jest.fn().mockReturnValue('1'),
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  isProjectMonorepo: jest.fn().mockReturnValue(false),
  setVerbose: jest.fn(),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('./utils/publishMonorepoPackages.js', () => ({
  publishMonorepoPackages: jest.fn(),
}));

jest.unstable_mockModule('./utils/publishPackage.js', () => ({
  publishPackage: jest.fn(),
}));

process.cwd = jest.fn().mockReturnValue('/root') as jest.Mocked<() => string>;

describe('publish', () => {
  describe('when package manager is not found', () => {
    let shelljs: jest.MockedObject<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      clearShelljsMock(shelljs);

      const { getPackageManager } = await import('@repodog/cli-utils');
      const mockedGetPackageManager = jest.mocked(getPackageManager);
      mockedGetPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
    });

    it('should log the correct error message', async () => {
      const { handler } = await import('./handler.js');
      handler();

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining(
          'Error: Could not derive the package manager from the lock file in the current working directory'
        )
      );
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.js');
      handler();
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when project has a standard repo structure', () => {
    let shelljs: jest.MockedObject<typeof import('shelljs')>;

    let mockedPublishPackage: jest.MockedFunction<
      (packageJsonPath: string, releaseMeta: Pick<ReleaseMeta, 'packageManager'>) => void
    >;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      clearShelljsMock(shelljs);

      const { publishPackage } = await import('./utils/publishPackage.js');
      mockedPublishPackage = jest.mocked(publishPackage);
      mockedPublishPackage.mockClear();
    });

    it('should call publishPackage with the correct arguments', async () => {
      const { handler } = await import('./handler.js');
      handler();

      expect(mockedPublishPackage).toHaveBeenCalledWith('/root/package.json', {
        packageManager: 'pnpm',
      });
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.js');
      handler();
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('when project has a monorepo structure', () => {
    let shelljs: jest.MockedObject<typeof import('shelljs')>;
    let mockedPublishMonorepoPackages: jest.MockedFunction<(packageManager: PackageManager) => void>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      clearShelljsMock(shelljs);

      const { isProjectMonorepo } = await import('@repodog/cli-utils');
      const mockedIsProjectMonorepo = jest.mocked(isProjectMonorepo);
      mockedIsProjectMonorepo.mockReturnValue(true);

      const { publishMonorepoPackages } = await import('./utils/publishMonorepoPackages.js');
      mockedPublishMonorepoPackages = jest.mocked(publishMonorepoPackages);
      mockedPublishMonorepoPackages.mockClear();
    });

    it('should call publishMonorepoPackages with the correct argument', async () => {
      const { handler } = await import('./handler.js');
      handler();
      expect(mockedPublishMonorepoPackages).toHaveBeenCalledWith('pnpm');
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.js');
      handler();
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });
});
