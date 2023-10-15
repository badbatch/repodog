import { jest } from '@jest/globals';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  asyncExec: jest.fn(),
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('./getRepoDogDevDependencyNames.ts', () => ({
  getRepoDogDevDependencyNames: jest.fn().mockReturnValue(['@repodog/alpha', '@repodog/bravo', '@repodog/charlie']),
}));

const peerDependenciesToInstall = {
  '@repodog/alpha': [
    ['alpha-0', '<5'],
    ['alpha-1', '<10'],
    ['alpha-2', '<3'],
  ],
  '@repodog/bravo': [
    ['bravo-0', '<1'],
    ['bravo-1', '<4'],
  ],
  '@repodog/charlie': [['charlie-0', '<7']],
};

jest.unstable_mockModule('./getPeerDependenciesToInstall.ts', () => ({
  getPeerDependenciesToInstall: jest
    .fn()
    .mockImplementation(name => peerDependenciesToInstall[name as keyof typeof peerDependenciesToInstall]),
}));

describe('installRepoDogPeerDependencies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when there are no repodog devDependency names', () => {
    it('asyncExec should not be called', async () => {
      const { asyncExec } = jest.mocked(await import('@repodog/cli-utils'));
      const { getRepoDogDevDependencyNames } = jest.mocked(await import('./getRepoDogDevDependencyNames.ts'));
      getRepoDogDevDependencyNames.mockReturnValueOnce([]);
      const { installRepoDogPeerDependencies } = await import('./installRepoDogPeerDependencies.ts');
      await installRepoDogPeerDependencies();
      expect(asyncExec).not.toHaveBeenCalled();
    });
  });

  describe('when there are repodog devDependency names', () => {
    it('should call asyncExec with the correct arguments', async () => {
      const { asyncExec } = jest.mocked(await import('@repodog/cli-utils'));
      const { installRepoDogPeerDependencies } = await import('./installRepoDogPeerDependencies.ts');
      await installRepoDogPeerDependencies();

      expect(asyncExec.mock.calls).toEqual([
        ['pnpm add -D alpha-0@"<5" alpha-1@"<10" alpha-2@"<3"'],
        ['pnpm add -D bravo-0@"<1" bravo-1@"<4"'],
        ['pnpm add -D charlie-0@"<7"'],
      ]);
    });
  });
});
