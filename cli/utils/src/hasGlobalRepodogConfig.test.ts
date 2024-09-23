import { jest } from '@jest/globals';
import { sep } from 'node:path';

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn(),
}));

jest.unstable_mockModule('node:os', () => ({
  homedir: jest.fn().mockReturnValue('/home/user'),
}));

jest.unstable_mockModule('node:path', () => ({
  resolve: jest.fn().mockImplementation((...paths) => paths.join(sep)),
}));

const { hasGlobalRepodogConfig } = await import('./hasGlobalRepodogConfig.ts');
const { existsSync } = jest.mocked(await import('node:fs'));

describe('hasGlobalRepodogConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
