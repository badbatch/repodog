import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';

jest.unstable_mockModule('shelljs', shelljsMock);

describe('addCommitPushRelease', () => {
  let shelljs: jest.Mocked<typeof import('shelljs')>;

  beforeEach(async () => {
    jest.clearAllMocks();
    shelljs = jest.mocked(await import('shelljs')).default;
  });

  it('should run the correct git commands', async () => {
    const { addCommitPushRelease } = await import('./addCommitPushRelease.ts');
    addCommitPushRelease('1.1.0');

    expect(shelljs.exec.mock.calls).toEqual([
      ['git add --all'],
      ['git commit --no-verify -m "Release version 1.1.0."'],
      ['git push --no-verify'],
      ['git tag -a v1.1.0 -m "Release version 1.1.0."'],
      ['git push origin v1.1.0 --no-verify'],
    ]);
  });
});
