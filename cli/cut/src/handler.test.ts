import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import * as cliUtils from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  ...cliUtils,
  addCommitPushRelease: jest.fn(),
  asyncExec: jest.fn(),
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

jest.unstable_mockModule('node:fs', () => ({
  writeFileSync: jest.fn(),
}));

jest.unstable_mockModule('shelljs', shelljsMock);

jest.unstable_mockModule('./utils/normaliseChangelog.ts', () => ({
  normaliseChangelog: jest.fn(),
}));

jest.unstable_mockModule('./utils/versionMonorepoPackages.ts', () => ({
  versionMonorepoPackages: jest.fn(),
}));

jest.unstable_mockModule('./utils/versionPackage.ts', () => ({
  versionPackage: jest.fn(),
}));

process.cwd = jest.fn().mockReturnValue('/root') as jest.Mocked<() => string>;

const {
  addCommitPushRelease,
  asyncExec,
  getChangedFiles,
  getNewVersion,
  getPackageManager,
  hasDryRunFlag,
  haveFilesChanged,
  isProjectMonorepo,
  loadPackageJson,
} = jest.mocked(await import('@repodog/cli-utils'));

const { writeFileSync } = jest.mocked(await import('node:fs'));
const shelljs = jest.mocked(await import('shelljs')).default;
const { versionMonorepoPackages } = jest.mocked(await import('./utils/versionMonorepoPackages.ts'));
const { versionPackage } = jest.mocked(await import('./utils/versionPackage.ts'));
const { handler } = await import('./handler.ts');

describe('cut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when dry-run flag is present in .repodogrc', () => {
    describe('when release type is "dry-run"', () => {
      beforeEach(() => {
        hasDryRunFlag.mockReturnValueOnce(true);
      });

      it('should call addCommitPushRelease', () => {
        void handler({ type: 'dry-run' });
        expect(addCommitPushRelease).toHaveBeenCalledWith('1.0.0');
      });

      it('should exit with the correct code', async () => {
        await handler({ type: 'dry-run' });
        expect(shelljs.exit).toHaveBeenCalledWith(0);
      });
    });

    describe('when release type is not "dry-run"', () => {
      beforeEach(() => {
        hasDryRunFlag.mockReturnValueOnce(true);
      });

      it('should not call addCommitPushRelease', () => {
        void handler({ type: 'major' });
        expect(addCommitPushRelease).not.toHaveBeenCalled();
      });

      it('should log the correct error message', () => {
        void handler({ type: 'major' });

        expect(shelljs.echo).toHaveBeenCalledWith(
          expect.stringContaining('Error: Expected type to be dry-run as __activeDryRun is set to true in .repodogrc'),
        );
      });

      it('should exit with the correct code', () => {
        void handler({ type: 'major' });
        expect(shelljs.exit).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('when release type is not valid', () => {
    it('should log the correct error message', () => {
      void handler({ type: 'blah' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining(
          'Error: Expected type to be a valid release type: major, premajor, minor, preminor, patch, prepatch, prerelease',
        ),
      );
    });

    it('should exit with the correct code', () => {
      void handler({ type: 'blah' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when release tag is not valid', () => {
    it('should log the correct error message', () => {
      void handler({ tag: 'blah', type: 'preminor' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected tag to be a valid release tag: alpha, beta, pr, unstable'),
      );
    });

    it('should exit with the correct code', () => {
      void handler({ tag: 'blah', type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when release tag is valid, but type is not pre release', () => {
    it('should log the correct error message', () => {
      void handler({ tag: 'alpha', type: 'major' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining(
          'Error: Expected type to be pre release type: premajor, preminor, prepatch, prerelease',
        ),
      );
    });

    it('should exit with the correct code', () => {
      void handler({ tag: 'alpha', type: 'major' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when package manager is not found', () => {
    beforeEach(() => {
      getPackageManager.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
    });

    it('should log the correct error message', () => {
      void handler({ type: 'preminor' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining(
          'Error: Could not derive the package manager from the lock file in the current working directory',
        ),
      );
    });

    it('should exit with the correct code', () => {
      void handler({ type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when there is a lastReleaseTag, force is false and no files have changed', () => {
    beforeEach(() => {
      haveFilesChanged.mockReturnValueOnce(false);
    });

    it('should log the correct error message', () => {
      void handler({ type: 'preminor' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: No files have changed since the last release tag: v1.0.0'),
      );
    });

    it('should exit with the correct code', () => {
      void handler({ type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when the new project version is invalid', () => {
    beforeEach(() => {
      getNewVersion.mockReturnValueOnce(null); // eslint-disable-line unicorn/no-null
    });

    it('should log the correct error message', () => {
      void handler({ type: 'preminor' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: The new project verison for a preminor increment on 1.0.0 is invalid'),
      );
    });

    it('should exit with the correct code', () => {
      void handler({ type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('cut:pre-version script', () => {
    describe('when the script is provided and skipPrehook is false', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValueOnce({
          name: 'alpha',
          scripts: {
            'cut:pre-version': 'pnpm run pre-version-script',
          },
          version: '1.0.0',
        });
      });

      it('should execute the script', () => {
        void handler({ type: 'preminor' });
        expect(asyncExec).toHaveBeenNthCalledWith(1, 'pnpm run cut:pre-version');
      });
    });

    describe('when the script is provided and skipPrehook is true', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValueOnce({
          name: 'alpha',
          scripts: {
            'cut:pre-version': 'pnpm run pre-version-script',
          },
          version: '1.0.0',
        });
      });

      it('should not execute the script', () => {
        void handler({ 'skip-prehook': true, type: 'preminor' });
        expect(asyncExec).not.toHaveBeenNthCalledWith(1, 'pnpm run cut:pre-version');
      });
    });

    describe('when the script is not provided', () => {
      it('should not execute the script', () => {
        void handler({ type: 'preminor' });
        expect(asyncExec).not.toHaveBeenNthCalledWith(1, 'pnpm run cut:pre-version');
      });
    });
  });

  describe('cut:post-version script', () => {
    describe('when the script is provided and skipPosthook is false', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValueOnce({
          name: 'alpha',
          scripts: {
            'cut:post-version': 'pnpm run post-version-script',
          },
          version: '1.0.0',
        });
      });

      it('should execute the script', () => {
        void handler({ type: 'preminor' });
        expect(asyncExec).toHaveBeenNthCalledWith(1, 'pnpm run cut:post-version');
      });
    });

    describe('when the script is provided and skipPosthook is true', () => {
      beforeEach(() => {
        loadPackageJson.mockReturnValueOnce({
          name: 'alpha',
          scripts: {
            'cut:post-version': 'pnpm run post-version-script',
          },
          version: '1.0.0',
        });
      });

      it('should not execute the script', () => {
        void handler({ 'skip-posthook': true, type: 'preminor' });
        expect(asyncExec).not.toHaveBeenNthCalledWith(1, 'pnpm run cut:post-version');
      });
    });

    describe('when the script is not provided', () => {
      it('should not execute the script', () => {
        void handler({ type: 'preminor' });
        expect(asyncExec).not.toHaveBeenNthCalledWith(1, 'pnpm run cut:post-version');
      });
    });
  });

  describe('when the cut:changelog script is provided', () => {
    beforeEach(() => {
      loadPackageJson.mockReturnValueOnce({
        name: 'alpha',
        scripts: {
          'cut:changelog': 'pnpm run changelog',
        },
        version: '1.0.0',
      });
    });

    it.each([['patch'], ['minor'], ['major']])('%p release should run changelog', type => {
      void handler({ type });
      expect(asyncExec).toHaveBeenCalledWith(`pnpm run cut:changelog -- --${type} --version 1.1.0`);
    });
  });

  describe('when the cut:changelog script is not provided', () => {
    it.each([['patch'], ['minor'], ['major']])('%p release should not run changelog', type => {
      void handler({ type });
      expect(asyncExec).not.toHaveBeenCalledWith(`pnpm run cut:changelog -- --${type} --version 1.1.0`);
    });
  });

  describe('when project has a standard repo structure', () => {
    it('should call getChangedFiles with the correct argument', () => {
      void handler({ tag: 'alpha', type: 'preminor' });
      expect(getChangedFiles).toHaveBeenCalledWith('v1.0.0');
    });

    it('should call versionPackage with the correct arguments', () => {
      void handler({ tag: 'alpha', type: 'preminor' });

      expect(versionPackage).toHaveBeenCalledWith(
        {
          version: '1.0.0',
        },
        {
          packageJsonPath: '/root/package.json',
          tag: 'alpha',
          type: 'preminor',
        },
      );
    });

    it('should call addCommitPushRelease', () => {
      void handler({ tag: 'alpha', type: 'preminor' });
      expect(addCommitPushRelease).toHaveBeenCalledWith('1.1.0');
    });

    it('should exit with the correct code', async () => {
      await handler({ tag: 'alpha', type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('when project has a monorepo structure', () => {
    beforeEach(() => {
      isProjectMonorepo.mockReturnValue(true);
    });

    it('should call versionMonorepoPackages with the correct argument', () => {
      void handler({ tag: 'alpha', type: 'preminor' });

      expect(versionMonorepoPackages).toHaveBeenCalledWith({
        force: false,
        packageManager: 'pnpm',
        tag: 'alpha',
        type: 'preminor',
      });
    });

    it('should call writeFileSync with the correct arguments', () => {
      void handler({ tag: 'alpha', type: 'preminor' });

      expect(writeFileSync).toHaveBeenCalledWith(
        '/root/package.json',
        JSON.stringify(
          {
            version: '1.1.0',
          },
          undefined,
          2,
        ),
      );
    });

    it('should call addCommitPushRelease', () => {
      void handler({ tag: 'alpha', type: 'preminor' });
      expect(addCommitPushRelease).toHaveBeenCalledWith('1.1.0');
    });

    it('should exit with the correct code', async () => {
      await handler({ tag: 'alpha', type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('when dry-run is set to true', () => {
    it('should not call addCommitPushRelease', () => {
      void handler({ 'dry-run': true, type: 'preminor' });
      expect(addCommitPushRelease).not.toHaveBeenCalled();
    });

    it('should exit with the correct code', () => {
      void handler({ 'dry-run': true, type: 'preminor' });
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });
});
