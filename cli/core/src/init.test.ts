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

const command = jest
  .fn()
  .mockImplementation(() => ({ command, help: jest.fn().mockReturnValue({ parseAsync: jest.fn() }) }));

const parseSync = jest.fn();

jest.unstable_mockModule('yargs', () => ({
  default: jest.fn().mockReturnValue({
    command,
    parseSync,
  }),
}));

const shelljs = jest.mocked(await import('shelljs')).default;
const { init } = await import('./init.ts');

describe('init', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when node version does satisfy package requirement', () => {
    beforeEach(() => {
      Object.defineProperty(process.versions, 'node', {
        configurable: true,
        value: '22.17.0',
        writable: false,
      });

      parseSync.mockReturnValueOnce({ ['skip-node-version-check']: false });
    });

    it('should call yargs.command', () => {
      init();
      expect(command).toHaveBeenCalledTimes(6);
    });
  });

  describe('when node version does not satisfy package requirement', () => {
    beforeEach(() => {
      Object.defineProperty(process.versions, 'node', {
        configurable: true,
        value: '16.19.0',
        writable: false,
      });

      parseSync.mockReturnValueOnce({ ['skip-node-version-check']: false });
    });

    it('should throw an error', () => {
      init();

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: node version 16.19.0 does not satisfy package requirement of ^22'),
      );
    });

    it('should exit with a code of 1', () => {
      init();
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when the skip-node-version-check flag is true', () => {
    beforeEach(() => {
      Object.defineProperty(process.versions, 'node', {
        configurable: true,
        value: '16.19.0',
        writable: false,
      });

      parseSync.mockReturnValueOnce({ ['skip-node-version-check']: true });
    });

    it('should call yargs.command', () => {
      init();
      expect(command).toHaveBeenCalledTimes(6);
    });
  });
});
