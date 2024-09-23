import { jest } from '@jest/globals';

jest.unstable_mockModule('./asyncExec.ts', () => ({
  asyncExec: jest.fn(),
}));

const { asyncExec } = jest.mocked(await import('./asyncExec.ts'));
const { addCommitPushRelease } = await import('./addCommitPushRelease.ts');

describe('addCommitPushRelease', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should run the correct git commands', async () => {
    await addCommitPushRelease('1.1.0');

    expect(asyncExec.mock.calls).toEqual([
      ['git add --all'],
      ['git commit --no-verify -m "Release version 1.1.0."'],
      ['git push --no-verify'],
      ['git tag -a v1.1.0 -m "Release version 1.1.0."'],
      ['git push origin v1.1.0 --no-verify'],
    ]);
  });
});
