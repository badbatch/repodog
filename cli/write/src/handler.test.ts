import { jest } from '@jest/globals';
import { shelljsMock } from '@repodog/cli-test-utils';
import * as cliUtils from '@repodog/cli-utils';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { WriteType } from './types.js';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  ...cliUtils,
  getPackageManager: jest.fn().mockReturnValue('pnpm'),
  loadRepodogConfig: jest.fn().mockReturnValue({}),
  setVerbose: jest.fn(),
  verboseLog: jest.fn(),
}));

jest.unstable_mockModule('node:fs', () => ({
  ...fs,
  readFileSync: jest.fn().mockReturnValue('console.log("hello world!");'),
}));

jest.unstable_mockModule('node:path', () => ({
  ...path,
  resolve: jest.fn().mockImplementation((...paths) => paths.join('/')),
}));

jest.unstable_mockModule('shelljs', shelljsMock);

const DESCRIBE_BLOCK = 'describe("hello world!", () => {});';

jest.unstable_mockModule('./utils/chatGptManager.js', () => ({
  createChatCompletion: jest.fn().mockReturnValue(`
    Here are the Jest unit tests for the typescript file \`./alpha.ts\`:\n\`\`\`\n${DESCRIBE_BLOCK}\n\`\`\`
  `),
}));

jest.unstable_mockModule('./utils/extractCode.js', () => ({
  extractCode: jest.fn().mockReturnValue(DESCRIBE_BLOCK),
}));

jest.unstable_mockModule('./utils/writeTestFile.js', () => ({
  writeTestFile: jest.fn(),
}));

process.cwd = () => '/root';

const filePath = 'alpha.test.ts';
const type = WriteType.TEST;

describe('handler', () => {
  describe('when the write type is invalid', () => {
    let shelljs: jest.MockedObject<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
    });

    it('should throw the correct error', async () => {
      const { handler } = await import('./handler.js');
      await handler({ 'file-path': filePath, type: 'blah' });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Expected type to be a valid write type: test')
      );
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.js');
      await handler({ 'file-path': filePath, type: 'blah' });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when no code is extracted', () => {
    let shelljs: jest.MockedObject<typeof import('shelljs')>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;

      const { extractCode } = jest.mocked(await import('./utils/extractCode.js'));
      extractCode.mockReturnValueOnce(undefined); // eslint-disable-line unicorn/no-useless-undefined
    });

    it('should throw the correct error', async () => {
      const { handler } = await import('./handler.js');
      await handler({ 'file-path': filePath, type });

      expect(shelljs.echo).toHaveBeenCalledWith(
        expect.stringContaining('Error: Code could not be extracted from raw answer.')
      );
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.js');
      await handler({ 'file-path': filePath, type });
      expect(shelljs.exit).toHaveBeenCalledWith(1);
    });
  });

  describe('when code is extracted correctly', () => {
    let shelljs: jest.MockedObject<typeof import('shelljs')>;
    let writeTestFile: jest.MockedFunction<typeof import('./utils/writeTestFile.js')['writeTestFile']>;

    beforeEach(async () => {
      jest.clearAllMocks();
      shelljs = jest.mocked(await import('shelljs')).default;
      ({ writeTestFile } = jest.mocked(await import('./utils/writeTestFile.js')));
    });

    it('should calll writeTestFile with the correct arguments', async () => {
      const { handler } = await import('./handler.js');
      await handler({ 'file-path': filePath, type });

      expect(writeTestFile).toHaveBeenCalledWith('/root', 'alpha.test', DESCRIBE_BLOCK, {
        language: 'javascript',
        packageManager: 'pnpm',
        skipFormat: false,
      });
    });

    it('should exit with the correct code', async () => {
      const { handler } = await import('./handler.js');
      await handler({ 'file-path': filePath, type });
      expect(shelljs.exit).toHaveBeenCalledWith(0);
    });
  });
});