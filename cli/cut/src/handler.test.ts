import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import * as cliUtils from '@repodog/cli-utils';

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  ...cliUtils,
  addCommitPushRelease: jest.fn(),
  calculateDuration: jest.fn().mockReturnValue('1'),
  clearDryRunFlag: jest.fn(),
  formatListLogMessage: jest.fn().mockImplementation(message => message),
  getChangedFiles: jest.fn().mockReturnValue([]),
  getLastReleaseTag: jest.fn().mockReturnValue('v1.0.0'),
  getNewVersion: jest.fn().mockReturnValue('1.1.0'),
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  hasDryRunFlag: jest.fn().mockReturnValue(false),
  haveFilesChanged: jest.fn().mockReturnValue(true),
  isProjectMonorepo: jest.fn().mockReturnValue(false),
  loadPackageJson: jest.fn().mockReturnValue({
    version: '1.0.0',
  }),
  setDryRunFlag: jest.fn(),
  setVerbose: jest.fn(),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('./utils/versionMonorepoPackages.ts', () => ({
  versionMonorepoPackages: jest.fn(),
}));

jest.unstable_mockModule('./utils/versionPackage.ts', () => ({
  versionPackage: jest.fn(),
}));

jest.unstable_mockModule('node:fs', () => ({
  writeFileSync: jest.fn(),
}));

process.cwd = jest.fn().mockReturnValue('/root') as jest.Mocked<() => string>;

describe('cut', () => {
  describe('when dry-run flag is present in .repodogrc', () => {
    describe('when release type is "dry-run"', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;
      let addCommitPushRelease: jest.Mocked<typeof import('@repodog/cli-utils')['addCommitPushRelease']>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
        let hasDryRunFlag: jest.Mocked<typeof import('@repodog/cli-utils')['hasDryRunFlag']>;
        ({ addCommitPushRelease, hasDryRunFlag } = jest.mocked(await import('@repodog/cli-utils')));
        hasDryRunFlag.mockReturnValueOnce(true);
      });

      it('should call addCommitPushRelease', async () => {
        const { handler } = await import('./handler.ts');
        handler({ type: 'dry-run' });
        expect(addCommitPushRelease).toHaveBeenCalled();
      });

      it('should exit with the correct code', async () => {
        const { handler } = await import('./handler.ts');
        handler({ type: 'dry-run' });
        expect(shelljs.exit).toHaveBeenCalledWith(0);
      });
    });

    describe('when release type is not "dry-run"', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;
      let addCommitPushRelease: jest.Mocked<typeof import('@repodog/cli-utils')['addCommitPushRelease']>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
        let hasDryRunFlag: jest.Mocked<typeof import('@repodog/cli-utils')['hasDryRunFlag']>;
        ({ addCommitPushRelease, hasDryRunFlag } = jest.mocked(await import('@repodog/cli-utils')));
        hasDryRunFlag.mockReturnValueOnce(true);
      });

      it('should not call addCommitPushRelease', async () => {
        const { handler } = await import('./handler.ts');
        handler({ type: 'major' });
        expect(addCommitPushRelease).not.toHaveBeenCalled();
      });

      it('should log the correct error message', async () => {
        const { handler } = await import('./handler.ts');
        handler({ type: 'major' });

        expect(shelljs.echo).toHaveBeenCalledWith(
          expect.stringContaining('Error: Expected type to be dry-run as __activeDryRun is set to true in .repodogrc')
        );
      });

      it('should exit with the correct code', async () => {
        const { handler } = await import('./handler.ts');
        handler({ type: 'major' });
        expect(shelljs.exit).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('when release type is not valid', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
    });

    it('should log the correct error message', async () => {
      const { handler } = await import('./handler.ts');
      handler({ type: 'blah' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining(
          'Error: Expected type to be a valid release type: major, premajor, minor, preminor, patch, prepatch, prerelease'
        )
      );
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.ts');
      handler({ type: 'blah' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when release tag is not valid', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
    });

    it('should log the correct error message', async () => {
      const { handler } = await import('./handler.ts');
      handler({ tag: 'blah', type: 'preminor' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected tag to be a valid release tag: alpha, beta, unstable')
      );
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.ts');
      handler({ tag: 'blah', type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when release tag is valid, but type is not pre release', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
    });

    it('should log the correct error message', async () => {
      const { handler } = await import('./handler.ts');
      handler({ tag: 'alpha', type: 'major' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected type to be pre release type: premajor, preminor, prepatch, prerelease')
      );
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.ts');
      handler({ tag: 'alpha', type: 'major' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when package manager is not found', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      const { getPackageManager } = jest.mocked(await import('@repodog/cli-utils'));
      getPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
    });

    it('should log the correct error message', async () => {
      const { handler } = await import('./handler.ts');
      handler({ type: 'preminor' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining(
          'Error: Could not derive the package manager from the lock file in the current working directory'
        )
      );
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.ts');
      handler({ type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when force is false and no files have changed', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      const { haveFilesChanged } = jest.mocked(await import('@repodog/cli-utils'));
      haveFilesChanged.mockReturnValueOnce(false);
    });

    it('should log the correct error message', async () => {
      const { handler } = await import('./handler.ts');
      handler({ type: 'preminor' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: No files have changed since the last release tag: v1.0.0')
      );
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.ts');
      handler({ type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when the new project version is invalid', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      const { getNewVersion } = jest.mocked(await import('@repodog/cli-utils'));
      getNewVersion.mockReturnValueOnce(null); // eslint-disable-line unicorn/no-null
    });

    it('should log the correct error message', async () => {
      const { handler } = await import('./handler.ts');
      handler({ type: 'preminor' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: The new project verison for a preminor increment on 1.0.0 is invalid')
      );
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.ts');
      handler({ type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('cut:pre-version script', () => {
    describe('when the script is provided and skipPrehook is false', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
        const { loadPackageJson } = jest.mocked(await import('@repodog/cli-utils'));

        loadPackageJson.mockReturnValueOnce({
          name: 'alpha',
          scripts: {
            'cut:pre-version': 'pnpm run pre-version-script',
          },
          version: '1.0.0',
        });
      });

      it('should execute the script', async () => {
        const { handler } = await import('./handler.ts');
        handler({ type: 'preminor' });
        expect(shelljs.exec).toHaveBeenNthCalledWith(1, 'pnpm run cut:pre-version');
      });
    });

    describe('when the script is provided and skipPrehook is true', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
        const { loadPackageJson } = jest.mocked(await import('@repodog/cli-utils'));

        loadPackageJson.mockReturnValueOnce({
          name: 'alpha',
          scripts: {
            'cut:pre-version': 'pnpm run pre-version-script',
          },
          version: '1.0.0',
        });
      });

      it('should not execute the script', async () => {
        const { handler } = await import('./handler.ts');
        handler({ 'skip-prehook': true, type: 'preminor' });
        expect(shelljs.exec).not.toHaveBeenNthCalledWith(1, 'pnpm run cut:pre-version');
      });
    });

    describe('when the script is not provided', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
      });

      it('should not execute the script', async () => {
        const { handler } = await import('./handler.ts');
        handler({ type: 'preminor' });
        expect(shelljs.exec).not.toHaveBeenNthCalledWith(1, 'pnpm run cut:pre-version');
      });
    });
  });

  describe('cut:post-version script', () => {
    describe('when the script is provided and skipPosthook is false', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
        const { loadPackageJson } = jest.mocked(await import('@repodog/cli-utils'));

        loadPackageJson.mockReturnValueOnce({
          name: 'alpha',
          scripts: {
            'cut:post-version': 'pnpm run post-version-script',
          },
          version: '1.0.0',
        });
      });

      it('should execute the script', async () => {
        const { handler } = await import('./handler.ts');
        handler({ type: 'preminor' });
        expect(shelljs.exec).toHaveBeenNthCalledWith(1, 'pnpm run cut:post-version');
      });
    });

    describe('when the script is provided and skipPosthook is true', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
        const { loadPackageJson } = jest.mocked(await import('@repodog/cli-utils'));

        loadPackageJson.mockReturnValueOnce({
          name: 'alpha',
          scripts: {
            'cut:post-version': 'pnpm run post-version-script',
          },
          version: '1.0.0',
        });
      });

      it('should not execute the script', async () => {
        const { handler } = await import('./handler.ts');
        handler({ 'skip-posthook': true, type: 'preminor' });
        expect(shelljs.exec).not.toHaveBeenNthCalledWith(1, 'pnpm run cut:post-version');
      });
    });

    describe('when the script is not provided', () => {
      let shelljs: jest.Mocked<typeof import('shelljs')>;

      beforeEach(async () => {
        jest.clearAllMocks();
        shelljs = jest.mocked(await import('shelljs')).default;
      });

      it('should not execute the script', async () => {
        const { handler } = await import('./handler.ts');
        handler({ type: 'preminor' });
        expect(shelljs.exec).not.toHaveBeenNthCalledWith(1, 'pnpm run cut:post-version');
      });
    });
  });

  describe('when the cut:changelog script is provided', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      const { loadPackageJson } = jest.mocked(await import('@repodog/cli-utils'));

      loadPackageJson.mockReturnValueOnce({
        name: 'alpha',
        scripts: {
          'cut:changelog': 'pnpm run changelog',
        },
        version: '1.0.0',
      });
    });

    it.each([['patch'], ['minor'], ['major']])('%p release should run changelog', async type => {
      const { handler } = await import('./handler.ts');
      handler({ type });
      expect(shelljs.exec).toHaveBeenCalledWith(`pnpm run cut:changelog -- --${type}`);
    });
  });

  describe('when the cut:changelog script is not provided', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
    });

    it.each([['patch'], ['minor'], ['major']])('%p release should not run changelog', async type => {
      const { handler } = await import('./handler.ts');
      handler({ type });
      expect(shelljs.exec).not.toHaveBeenCalledWith(`pnpm run cut:changelog -- --${type}`);
    });
  });

  describe('when project has a standard repo structure', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;
    let getChangedFiles: jest.Mocked<typeof import('@repodog/cli-utils')['getChangedFiles']>;
    let versionPackage: jest.Mocked<typeof import('./utils/versionPackage.ts')['versionPackage']>;
    let addCommitPushRelease: jest.Mocked<typeof import('@repodog/cli-utils')['addCommitPushRelease']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      ({ addCommitPushRelease, getChangedFiles } = jest.mocked(await import('@repodog/cli-utils')));
      ({ versionPackage } = jest.mocked(await import('./utils/versionPackage.ts')));
    });

    it('should call getChangedFiles with the correct argument', async () => {
      const { handler } = await import('./handler.ts');
      handler({ preid: '12345', tag: 'alpha', type: 'preminor' });
      expect(getChangedFiles).toHaveBeenCalledWith('v1.0.0');
    });

    it('should call versionPackage with the correct arguments', async () => {
      const { handler } = await import('./handler.ts');
      handler({ preid: '12345', tag: 'alpha', type: 'preminor' });

      expect(versionPackage).toHaveBeenCalledWith(
        {
          version: '1.0.0',
        },
        {
          packageJsonPath: '/root/package.json',
          preReleaseId: '12345',
          tag: 'alpha',
          type: 'preminor',
        }
      );
    });

    it('should call addCommitPushRelease', async () => {
      const { handler } = await import('./handler.ts');
      handler({ preid: '12345', tag: 'alpha', type: 'preminor' });
      expect(addCommitPushRelease).toHaveBeenCalled();
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.ts');
      handler({ preid: '12345', tag: 'alpha', type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('when project has a monorepo structure', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    let versionMonorepoPackages: jest.Mocked<
      typeof import('./utils/versionMonorepoPackages.ts')['versionMonorepoPackages']
    >;

    let writeFileSync: jest.Mocked<typeof import('node:fs')['writeFileSync']>;
    let addCommitPushRelease: jest.Mocked<typeof import('@repodog/cli-utils')['addCommitPushRelease']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      let isProjectMonorepo;
      ({ addCommitPushRelease, isProjectMonorepo } = jest.mocked(await import('@repodog/cli-utils')));
      isProjectMonorepo.mockReturnValue(true);
      ({ versionMonorepoPackages } = jest.mocked(await import('./utils/versionMonorepoPackages.ts')));
      ({ writeFileSync } = jest.mocked(await import('node:fs')));
    });

    it('should call versionMonorepoPackages with the correct argument', async () => {
      const { handler } = await import('./handler.ts');
      handler({ preid: '12345', tag: 'alpha', type: 'preminor' });

      expect(versionMonorepoPackages).toHaveBeenCalledWith({
        force: false,
        packageManager: 'pnpm',
        preReleaseId: '12345',
        tag: 'alpha',
        type: 'preminor',
      });
    });

    it('should call writeFileSync with the correct arguments', async () => {
      const { handler } = await import('./handler.ts');
      handler({ preid: '12345', tag: 'alpha', type: 'preminor' });

      expect(writeFileSync).toHaveBeenCalledWith(
        '/root/package.json',
        JSON.stringify(
          {
            version: '1.1.0',
          },
          undefined,
          2
        )
      );
    });

    it('should call addCommitPushRelease', async () => {
      const { handler } = await import('./handler.ts');
      handler({ preid: '12345', tag: 'alpha', type: 'preminor' });
      expect(addCommitPushRelease).toHaveBeenCalled();
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.ts');
      handler({ preid: '12345', tag: 'alpha', type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('when dry-run is set to true', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;
    let addCommitPushRelease: jest.Mocked<typeof import('@repodog/cli-utils')['addCommitPushRelease']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      ({ addCommitPushRelease } = jest.mocked(await import('@repodog/cli-utils')));
    });

    it('should not call addCommitPushRelease', async () => {
      const { handler } = await import('./handler.ts');
      handler({ 'dry-run': true, type: 'preminor' });
      expect(addCommitPushRelease).not.toHaveBeenCalled();
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.ts');
      handler({ 'dry-run': true, type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });
});
