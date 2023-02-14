import { jest } from '@jest/globals';
import { clearShelljsMock, shelljsMock } from '@repodog/cli-test-utils';
import type { ChildProcess } from 'node:child_process';

jest.unstable_mockModule('shelljs', shelljsMock);

describe('getLatestPackageVersionOnNpm', () => {
  let shelljs: jest.MockedObject<typeof import('shelljs')>;

  beforeEach(async () => {
    shelljs = jest.mocked(await import('shelljs')).default;
    clearShelljsMock(shelljs);

    shelljs.exec.mockReturnValue({
      stdout: '1.0.0',
    } as unknown as ChildProcess);
  });

  it('should run the correct git commands', async () => {
    const { getLatestPackageVersionOnNpm } = await import('./getLatestPackageVersionOnNpm.js');
    getLatestPackageVersionOnNpm('alpha');
    expect(shelljs.exec).toHaveBeenCalledWith('npm view alpha version', { silent: true });
  });
});