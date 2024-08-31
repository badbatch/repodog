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

const directory = '/root/packages/alpha/src';
const name = 'fileToTest';
const testFilePath = [directory, `${name}.test.ts`].join(sep);
const code = 'console.log("Hello, world!");';

const options = {
  language: Language.TYPESCRIPT,
  packageManager: PackageManager.PNPM,
};

describe('writeTestFile', () => {
  let writeFileSync: jest.Mocked<(typeof import('node:fs'))['writeFileSync']>;
  let asyncExec: jest.Mocked<(typeof import('@repodog/cli-utils'))['asyncExec']>;

  beforeEach(async () => {
    jest.clearAllMocks();
    ({ writeFileSync } = jest.mocked(await import('node:fs')));
    ({ asyncExec } = jest.mocked(await import('@repodog/cli-utils')));
  });

  it('should write the test file with the correct name and extension', async () => {
    const { writeTestFile } = await import('./writeTestFile.ts');
    await writeTestFile(directory, name, code, { ...options, skipFormat: false });
    expect(writeFileSync).toHaveBeenCalledWith(testFilePath, code);
  });

  it('should skip formatting if skipFormat is true', async () => {
    const { writeTestFile } = await import('./writeTestFile.ts');
    await writeTestFile(directory, name, code, { ...options, skipFormat: true });
    expect(asyncExec).not.toHaveBeenCalled();
  });

  it('should format the test file if skipFormat is false', async () => {
    const { writeTestFile } = await import('./writeTestFile.ts');
    await writeTestFile(directory, name, code, { ...options, skipFormat: false });

    expect(asyncExec).toHaveBeenCalledWith(`pnpm dlx eslint --fix ${testFilePath}`, {
      silent: true,
    });
  });
});
