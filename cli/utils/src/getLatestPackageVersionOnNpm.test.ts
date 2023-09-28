import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import type { ChildProcess } from 'node:child_process';

jest.unstable_mockModule('shelljs', shelljsMock);

describe('getLatestPackageVersionOnNpm', () => {
  let shelljs: jest.Mocked<typeof import('shelljs')>;

  beforeEach(async () => {
    jest.clearAllMocks();
    shelljs = jest.mocked(await import('shelljs'));

    shelljs.exec.mockReturnValue({
      stdout: '1.0.0',
    } as unknown as ChildProcess);
  });

  it('should run the correct git commands', async () => {
    const { getLatestPackageVersionOnNpm } = await import('./getLatestPackageVersionOnNpm.ts');
    getLatestPackageVersionOnNpm('alpha');
    expect(shelljs.exec).toHaveBeenCalledWith('npm view alpha version', { silent: true });
  });
});
