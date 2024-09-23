import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import { type ExecCallback, type ExecFunction } from 'shelljs';

jest.unstable_mockModule('shelljs', shelljsMock);
const shelljs = jest.mocked(await import('shelljs')).default;
const { asyncExec } = await import('./asyncExec.ts');

describe('asyncExec', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the execution is successful', () => {
    beforeEach(() => {
      shelljs.exec.mockImplementationOnce(((_cmd: string, callback: ExecCallback) => {
        callback(0, 'success', '');
      }) as ExecFunction);
    });

    it('should resolve the stdout', async () => {
      await expect(asyncExec('cmd')).resolves.toBe('success');
    });
  });

  describe('when the execution fails', () => {
    describe('when options.silent is not true', () => {
      beforeEach(() => {
        shelljs.exec.mockImplementationOnce(((_cmd: string, callback: ExecCallback) => {
          callback(1, '', 'failure');
        }) as ExecFunction);
      });

      it('should reject with an error with stderr', async () => {
        await expect(() => asyncExec('cmd')).rejects.toEqual(new Error('failure'));
      });
    });

    describe('when options.silent is true', () => {
      beforeEach(() => {
        shelljs.exec.mockImplementationOnce(((_cmd: string, callback: ExecCallback) => {
          callback(1, '', 'failure');
        }) as ExecFunction);
      });

      it('should resolve the stdout', async () => {
        await expect(asyncExec('cmd', { silent: true })).resolves.toBe('');
      });
    });
  });
});
