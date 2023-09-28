import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';

jest.unstable_mockModule('shelljs', shelljsMock);

describe('verboseLog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when verbose is true', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs'));
      const { setVerbose } = await import('./verboseLog.ts');
      setVerbose(true);
    });

    it('should call echo with the correct message', async () => {
      const { verboseLog } = await import('./verboseLog.ts');
      verboseLog('oops');
      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('oops'));
    });
  });

  describe('when verbose is false', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs'));
      const { setVerbose } = await import('./verboseLog.ts');
      setVerbose(false);
    });

    it('should not call echo', async () => {
      const { verboseLog } = await import('./verboseLog.ts');
      verboseLog('oops');
      expect(shelljs.echo).not.toHaveBeenCalled();
    });
  });
});
