import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  calculateDuration: jest.fn().mockReturnValue('1'),
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  isProjectMonorepo: jest.fn().mockReturnValue(false),
  setVerbose: jest.fn(),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('./utils/publishMonorepoPackages.ts', () => ({
  publishMonorepoPackages: jest.fn(),
}));

jest.unstable_mockModule('./utils/publishPackage.ts', () => ({
  publishPackage: jest.fn(),
}));

process.cwd = jest.fn().mockReturnValue('/root') as jest.Mocked<() => string>;
const { getPackageManager, isProjectMonorepo } = jest.mocked(await import('@repodog/cli-utils'));
const shelljs = jest.mocked(await import('shelljs')).default;
const { publishMonorepoPackages } = jest.mocked(await import('./utils/publishMonorepoPackages.ts'));
const { publishPackage } = jest.mocked(await import('./utils/publishPackage.ts'));
const { handler } = await import('./handler.ts');

describe('handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when package manager is not found', () => {
    beforeEach(() => {
      getPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
    });

    it('should log the correct error message', async () => {
      await handler();

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining(
          'Error: Could not derive the package manager from the lock file in the current working directory',
        ),
      );
    });

    it('should exit with the correct code', async () => {
      await handler();
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when project has a standard repo structure', () => {
    it('should call publishPackage with the correct arguments', async () => {
      await handler();

      expect(publishPackage).toHaveBeenCalledWith('/root/package.json', {
        packageManager: 'pnpm',
      });
    });

    it('should exit with the correct code', async () => {
      await handler();
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('when project has a monorepo structure', () => {
    beforeEach(() => {
      isProjectMonorepo.mockReturnValue(true);
    });

    it('should call publishMonorepoPackages with the correct argument', async () => {
      await handler();
      expect(publishMonorepoPackages).toHaveBeenCalledWith('pnpm');
    });

    it('should exit with the correct code', async () => {
      await handler();
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });
});
