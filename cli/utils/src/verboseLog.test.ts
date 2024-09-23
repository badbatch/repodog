import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';

jest.unstable_mockModule('shelljs', shelljsMock);
const shelljs = jest.mocked(await import('shelljs')).default;
const { setVerbose, verboseLog } = await import('./verboseLog.ts');

describe('verboseLog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when verbose is true', () => {
    beforeEach(() => {
      setVerbose(true);
    });

    it('should call echo with the correct message', () => {
      verboseLog('oops');
      expect(shelljs.echo).toHaveBeenCalledWith(expect.stringContaining('oops'));
    });
  });

  describe('when verbose is false', () => {
    beforeEach(() => {
      setVerbose(false);
    });

    it('should not call echo', () => {
      verboseLog('oops');
      expect(shelljs.echo).not.toHaveBeenCalled();
    });
  });
});
