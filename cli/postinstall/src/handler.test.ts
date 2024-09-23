import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import * as cliUtils from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  ...cliUtils,
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  isValidNewSubType: jest.fn().mockReturnValue(true),
  isValidNewType: jest.fn().mockReturnValue(true),
}));

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('./utils/runCommonPostInstallTasks.ts', () => ({
  runCommonPostInstallTasks: jest.fn(),
}));

const { getPackageManager, isValidNewSubType, isValidNewType } = jest.mocked(await import('@repodog/cli-utils'));
const shelljs = jest.mocked(await import('shelljs')).default;
const { runCommonPostInstallTasks } = jest.mocked(await import('./utils/runCommonPostInstallTasks.ts'));
const { handler } = await import('./handler.ts');

describe('handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when invalid type is passed in', () => {
    beforeEach(() => {
      isValidNewType.mockReturnValueOnce(false);
    });

    it('should throw the correct error', async () => {
      await handler({ subtype: 'library', type: 'alpha' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected type to be a valid new type: pkg, repo'),
      );
    });

    it('should exit with a code of 1', async () => {
      await handler({ subtype: 'library', type: 'alpha' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when invalid subtype is passed in', () => {
    beforeEach(() => {
      isValidNewSubType.mockReturnValueOnce(false);
    });

    it('should throw the correct error', async () => {
      await handler({ subtype: 'bravo', type: 'pkg' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected subtype to be a valid new subtype: component, config, library'),
      );
    });

    it('should exit with a code of 1', async () => {
      await handler({ subtype: 'bravo', type: 'pkg' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when a packageManager cannot be derived', () => {
    beforeEach(() => {
      getPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
    });

    it('should throw the correct error', async () => {
      await handler({ subtype: 'library', type: 'pkg' });
      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('Error: Could not derive the package manager'));
    });

    it('should exit with a code of 1', async () => {
      await handler({ subtype: 'library', type: 'pkg' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when types are valid and packageManager is known', () => {
    it('should call runCommonPostInstallTasks with the correct arguments', async () => {
      await handler({ subtype: 'library', type: 'pkg' });
      expect(runCommonPostInstallTasks).toHaveBeenCalledWith('pkg', 'library');
    });

    it('should exit with a code of 0', async () => {
      await handler({ subtype: 'library', type: 'pkg' });
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });
});
