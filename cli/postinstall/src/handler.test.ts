import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import * as cliUtils from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  ...cliUtils,
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
}));

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('./utils/isValidPostInstallSubType.ts', () => ({
  isValidPostInstallSubType: jest.fn().mockReturnValue(true),
}));

jest.unstable_mockModule('./utils/isValidPostInstallType.ts', () => ({
  isValidPostInstallType: jest.fn().mockReturnValue(true),
}));

jest.unstable_mockModule('./utils/runCommonPostInstallTasks.ts', () => ({
  runCommonPostInstallTasks: jest.fn(),
}));

describe('handler', () => {
  describe('when invalid type is passed in', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      // eslint-disable-next-line unicorn/no-await-expression-member
      shelljs = jest.mocked((await import('shelljs')).default);
      const { isValidPostInstallType } = jest.mocked(await import('./utils/isValidPostInstallType.ts'));
      isValidPostInstallType.mockReturnValueOnce(false);
    });

    it('should throw the correct error', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'library', type: 'alpha' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected type to be a valid postinstall type: pkg, repo')
      );
    });

    it('should exit with a code of 1', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'library', type: 'alpha' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when invalid subtype is passed in', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      // eslint-disable-next-line unicorn/no-await-expression-member
      shelljs = jest.mocked((await import('shelljs')).default);
      const { isValidPostInstallSubType } = jest.mocked(await import('./utils/isValidPostInstallSubType.ts'));
      isValidPostInstallSubType.mockReturnValueOnce(false);
    });

    it('should throw the correct error', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'bravo', type: 'pkg' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected subtype to be a valid postinstall subtype: library')
      );
    });

    it('should exit with a code of 1', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'bravo', type: 'pkg' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when a packageManager cannot be derived', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      // eslint-disable-next-line unicorn/no-await-expression-member
      shelljs = jest.mocked((await import('shelljs')).default);
      const { getPackageManager } = jest.mocked(await import('@repodog/cli-utils'));
      getPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
    });

    it('should throw the correct error', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'library', type: 'pkg' });
      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('Error: Could not derive the package manager'));
    });

    it('should exit with a code of 1', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'library', type: 'pkg' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when types are valid and packageManager is known', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    let runCommonPostInstallTasks: jest.Mocked<
      typeof import('./utils/runCommonPostInstallTasks.ts')['runCommonPostInstallTasks']
    >;

    beforeEach(async () => {
      jest.clearAllMocks();
      // eslint-disable-next-line unicorn/no-await-expression-member
      shelljs = jest.mocked((await import('shelljs')).default);
      ({ runCommonPostInstallTasks } = jest.mocked(await import('./utils/runCommonPostInstallTasks.ts')));
    });

    it('should call runCommonPostInstallTasks with the correct arguments', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'library', type: 'pkg' });
      expect(runCommonPostInstallTasks).toHaveBeenCalledWith('pkg', 'library');
    });

    it('should exit with a code of 0', async () => {
      const { handler } = await import('./handler.ts');
      await handler({ subtype: 'library', type: 'pkg' });
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });
});
