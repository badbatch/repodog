import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  calculateDuration: jest.fn(),
  setVerbose: jest.fn(),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('./utils/handleGlobalConfigSetup.ts', () => ({
  handleGlobalConfigSetup: jest.fn(),
}));

describe('handler', () => {
  let shelljs: jest.Mocked<typeof import('shelljs')>;

  beforeEach(async () => {
    jest.clearAllMocks();
    shelljs = jest.mocked(await import('shelljs'));
  });

  describe('when handleGlobalConfigSetup executes successfully', () => {
    it('should exit with a code of 0', async () => {
      const { handler } = await import('./handler.ts');
      await handler();
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('when handleGlobalConfigSetup throws an exception', () => {
    it('should exit with a code of 1', async () => {
      const { handleGlobalConfigSetup } = jest.mocked(await import('./utils/handleGlobalConfigSetup.ts'));
      handleGlobalConfigSetup.mockRejectedValueOnce(new Error('Oops'));
      const { handler } = await import('./handler.ts');
      await handler();
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });
});
