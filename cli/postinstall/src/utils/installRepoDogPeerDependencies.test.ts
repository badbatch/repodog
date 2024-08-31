import { jest } from '@jest/globals';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  asyncExec: jest.fn(),
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  isProjectMonorepo: jest.fn().mockReturnValue(false),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('./getRepoDogDevDependencyNames.ts', () => ({
  getRepoDogDevDependencyNames: jest.fn().mockReturnValue(['@repodog/alpha', '@repodog/bravo', '@repodog/charlie']),
}));

const peerDependenciesToInstall = {
  '@repodog/alpha': [
    ['alpha-0', '4.0.0'],
    ['alpha-1', '9.0.0'],
    ['alpha-2', '2.0.0'],
  ],
  '@repodog/bravo': [
    ['bravo-0', '0.0.1'],
    ['bravo-1', '3.0.0'],
  ],
  '@repodog/charlie': [['charlie-0', '6.0.0']],
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

      expect(asyncExec).toHaveBeenCalledWith(
        'pnpm add -D alpha-0@^4.0.0 alpha-1@^9.0.0 alpha-2@^2.0.0 bravo-0@^0.0.1 bravo-1@^3.0.0 charlie-0@^6.0.0',
      );
    });

    describe('when the project is a monorepo', () => {
      it('should call asyncExec with the correct arguments', async () => {
        const { asyncExec, isProjectMonorepo } = jest.mocked(await import('@repodog/cli-utils'));
        const { installRepoDogPeerDependencies } = await import('./installRepoDogPeerDependencies.ts');
        isProjectMonorepo.mockReturnValueOnce(true);
        await installRepoDogPeerDependencies();

        expect(asyncExec).toHaveBeenCalledWith(
          'pnpm add -w -D alpha-0@^4.0.0 alpha-1@^9.0.0 alpha-2@^2.0.0 bravo-0@^0.0.1 bravo-1@^3.0.0 charlie-0@^6.0.0',
        );
      });
    });
  });
});
