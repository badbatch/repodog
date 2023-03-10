import { jest } from '@jest/globals';
import { clearShelljsMock, shelljsMock } from '@repodog/cli-test-utils';
import type { ExecCallback, ExecFunction } from 'shelljs';

jest.unstable_mockModule('shelljs', shelljsMock);

describe('asyncExec', () => {
  describe('when the execution is successful', () => {
    let shelljs: jest.MockedObject<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      clearShelljsMock(shelljs);

      shelljs.exec.mockImplementationOnce(function (_cmd: string, callback: ExecCallback) {
        callback(0, 'success', '');
      } as ExecFunction);
    });

    it('should resolve the stdout', async () => {
      const { asyncExec } = await import('./asyncExec.js');
      expect(await asyncExec('cmd')).toBe('success');
    });
  });

  describe('when the execution fails', () => {
    let shelljs: jest.MockedObject<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;
      clearShelljsMock(shelljs);

      shelljs.exec.mockImplementationOnce(function (_cmd: string, callback: ExecCallback) {
        callback(0, '', 'failure');
      } as ExecFunction);
    });

    it('should reject with an error with stderr', async () => {
      const { asyncExec } = await import('./asyncExec.js');
      await expect(() => asyncExec('cmd')).rejects.toEqual(new Error('failure'));
    });
  });
});
