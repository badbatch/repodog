import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import * as cliUtils from '@repodog/cli-utils';

jest.unstable_mockModule('@repodog/cli-cut', () => ({ command: jest.fn() }));
jest.unstable_mockModule('@repodog/cli-new', () => ({ command: jest.fn() }));
jest.unstable_mockModule('@repodog/cli-publish', () => ({ command: jest.fn() }));
jest.unstable_mockModule('@repodog/cli-setup', () => ({ command: jest.fn() }));
jest.unstable_mockModule('@repodog/cli-utils', () => ({ ...cliUtils, setVerbose: jest.fn(), verboseLog: jest.fn() }));
jest.unstable_mockModule('@repodog/cli-write', () => ({ command: jest.fn() }));
jest.unstable_mockModule('shelljs', shelljsMock);

const command = jest.fn().mockImplementation(() => ({ command, help: jest.fn().mockReturnValue({ argv: {} }) }));

jest.unstable_mockModule('yargs', () => ({
  default: {
    argv: {},
    command,
  },
}));

describe('init', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when node version does satisfy package requirement', () => {
    beforeEach(() => {
      Object.defineProperty(process.versions, 'node', {
        configurable: true,
        value: '20.10.0',
        writable: false,
      });
    });

    it('should call yargs.command', async () => {
      const { init } = await import('./init.ts');
      init();
      expect(command).toHaveBeenCalledTimes(6);
    });
  });

  describe('when node version does not satisfy package requirement', () => {
    let shelljs: jest.Mocked<typeof import('shelljs')>;

    beforeEach(async () => {
      shelljs = jest.mocked(await import('shelljs')).default;

      Object.defineProperty(process.versions, 'node', {
        configurable: true,
        value: '16.19.0',
        writable: false,
      });
    });

    it('should throw an error', async () => {
      const { init } = await import('./init.ts');
      init();

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: node version 16.19.0 does not satisfy package requirement of ^20.10.0'),
      );
    });

    it('should exit with a code of 1', async () => {
      const { init } = await import('./init.ts');
      init();
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });

    describe('when the skip-node-version-check flag is true', () => {
      beforeEach(async () => {
        const yargs = jest.mocked(await import('yargs'));
        yargs.default.argv['skip-node-version-check'] = true;
      });

      it('should call yargs.command', async () => {
        const { init } = await import('./init.ts');
        init();
        expect(command).toHaveBeenCalledTimes(6);
      });
    });
  });
});
