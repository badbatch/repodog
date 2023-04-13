import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import type { ExecCallback, ExecFunction } from 'shelljs';

jest.unstable_mockModule('shelljs', shelljsMock);

describe('asyncExec', () => {
  describe('when the execution is successful', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;

      shelljs.exec.mockImplementationOnce(function (_cmd: string, callback: ExecCallback) {
        callback(0, 'success', '');
      } as ExecFunction);
    });

    it('should resolve the stdout', async () => {
      const { asyncExec } = await import('./asyncExec.ts');
      expect(await asyncExec('cmd')).toBe('success');
    });
  });

  describe('when the execution fails', () => {
    describe('when options.silent is not true', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;

        shelljs.exec.mockImplementationOnce(function (_cmd: string, callback: ExecCallback) {
          callback(0, '', 'failure');
        } as ExecFunction);
      });

      it('should reject with an error with stderr', async () => {
        const { asyncExec } = await import('./asyncExec.ts');
        await expect(() => asyncExec('cmd')).rejects.toEqual(new Error('failure'));
      });
    });

    describe('when options.silent is true', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;

        shelljs.exec.mockImplementationOnce(function (_cmd: string, callback: ExecCallback) {
          callback(0, '', 'failure');
        } as ExecFunction);
      });

      it('should resolve the stdout', async () => {
        const { asyncExec } = await import('./asyncExec.ts');
        expect(await asyncExec('cmd', { silent: true })).toBe('');
      });
    });
  });
});
