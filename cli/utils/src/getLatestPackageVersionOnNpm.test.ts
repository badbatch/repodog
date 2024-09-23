import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import { type ChildProcess } from 'node:child_process';

jest.unstable_mockModule('shelljs', shelljsMock);
const shelljs = jest.mocked(await import('shelljs')).default;
const { getLatestPackageVersionOnNpm } = await import('./getLatestPackageVersionOnNpm.ts');

describe('getLatestPackageVersionOnNpm', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    shelljs.exec.mockReturnValue({
      stdout: '1.0.0',
    } as unknown as ChildProcess);
  });

  it('should run the correct git commands', () => {
    getLatestPackageVersionOnNpm('alpha');
    expect(shelljs.exec).toHaveBeenCalledWith('npm view alpha version', { silent: true });
  });
});
