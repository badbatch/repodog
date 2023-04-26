import { jest } from '@jest/globals';

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn(),
}));

jest.unstable_mockModule('node:os', () => ({
  homedir: jest.fn().mockReturnValue('/home/user'),
}));

jest.unstable_mockModule('node:path', () => ({
  resolve: jest.fn().mockImplementation((...paths) => paths.join('/')),
}));

describe('hasGlobalRepodogConfig', () => {
  let hasGlobalRepodogConfig: typeof import('./hasGlobalRepodogConfig.ts')['hasGlobalRepodogConfig'];
  let existsSync: jest.Mocked<typeof import('node:fs')['existsSync']>;

  beforeEach(async () => {
    jest.clearAllMocks();
    ({ hasGlobalRepodogConfig } = await import('./hasGlobalRepodogConfig.ts'));
    ({ existsSync } = jest.mocked(await import('node:fs')));
  });

  it('should return true if global repodog config exists', () => {
    existsSync.mockReturnValueOnce(true);
    expect(hasGlobalRepodogConfig()).toBe(true);
  });

  it('should return false if global repodog config does not exist', () => {
    existsSync.mockReturnValueOnce(false);
    expect(hasGlobalRepodogConfig()).toBe(false);
  });
});
