import { jest } from '@jest/globals';
import { Language, PackageManager, getLanguageExtension, getPackageManagerTemporaryCmd } from '@repodog/cli-utils';
import { sep } from 'node:path';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  asyncExec: jest.fn(),
  getLanguageExtension,
  getPackageManagerTemporaryCmd,
}));

jest.unstable_mockModule('node:fs', () => ({
  writeFileSync: jest.fn(),
}));

jest.unstable_mockModule('node:path', () => ({
  resolve: jest.fn().mockImplementation((...paths) => paths.join(sep)),
}));

jest.unstable_mockModule('./injectFileExtension.ts', () => ({
  injectFileExtension: jest.fn().mockImplementation(code => code),
}));

jest.unstable_mockModule('./removeComments.ts', () => ({
  removeComments: jest.fn().mockImplementation(code => code),
}));

const { writeFileSync } = jest.mocked(await import('node:fs'));
const { asyncExec } = jest.mocked(await import('@repodog/cli-utils'));
const { writeTestFile } = await import('./writeTestFile.ts');
const directory = '/root/packages/alpha/src';
const name = 'fileToTest';
const testFilePath = [directory, `${name}.test.ts`].join(sep);
const code = 'console.log("Hello, world!");';

const options = {
  language: Language.TYPESCRIPT,
  packageManager: PackageManager.PNPM,
};

describe('writeTestFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should write the test file with the correct name and extension', async () => {
    await writeTestFile(directory, name, code, { ...options, skipFormat: false });
    expect(writeFileSync).toHaveBeenCalledWith(testFilePath, code);
  });

  it('should skip formatting if skipFormat is true', async () => {
    await writeTestFile(directory, name, code, { ...options, skipFormat: true });
    expect(asyncExec).not.toHaveBeenCalled();
  });

  it('should format the test file if skipFormat is false', async () => {
    await writeTestFile(directory, name, code, { ...options, skipFormat: false });

    expect(asyncExec).toHaveBeenCalledWith(`pnpm dlx eslint --fix ${testFilePath}`, {
      silent: true,
    });
  });
});
