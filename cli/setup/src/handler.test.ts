import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('./utils/handleGlobalConfigSetup.ts', () => ({
  handleGlobalConfigSetup: jest.fn(),
}));

const shelljs = jest.mocked(await import('shelljs')).default;
const { handleGlobalConfigSetup } = jest.mocked(await import('./utils/handleGlobalConfigSetup.ts'));
const { handler } = await import('./handler.ts');

describe('handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when handleGlobalConfigSetup executes successfully', () => {
    it('should exit with a code of 0', async () => {
      await handler();
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('when handleGlobalConfigSetup throws an exception', () => {
    it('should exit with a code of 1', async () => {
      handleGlobalConfigSetup.mockRejectedValueOnce(new Error('Oops'));
      await handler();
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });
});
