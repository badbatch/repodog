import { jest } from '@jest/globals';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  resolveAbsolutePath: jest.fn().mockImplementation(path => path),
}));

const isFile = jest.fn().mockReturnValue(true);

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readdirSync: jest.fn().mockReturnValue([{ isFile }, { isFile }, { isFile }]),
}));

const { existsSync, readdirSync } = jest.mocked(await import('node:fs'));
const { getLeafAdditionalTemplatesPath } = await import('./getLeafAdditionalTemplatesPath.ts');

describe('getLeafAdditionalTemplatesPath', () => {
  it('should return the correct absolute path', () => {
    expect(getLeafAdditionalTemplatesPath('./additional/templates/path', ['external', 'type', 'path'])).toBe(
      './additional/templates/path/external/type/path',
    );
  });

  describe('when there is no additionalTemplatesPath', () => {
    it('should return undefined', () => {
      expect(getLeafAdditionalTemplatesPath(undefined, ['external', 'type', 'path'])).toBeUndefined();
    });
  });

  describe('when the absolute path does not exist', () => {
    beforeEach(() => {
      existsSync.mockReturnValueOnce(false);
    });

    it('should return undefined', () => {
      expect(getLeafAdditionalTemplatesPath('additional/templates/path', ['external', 'type', 'path'])).toBeUndefined();
    });
  });

  describe('when the path does not contain any files', () => {
    beforeEach(() => {
      readdirSync.mockReturnValueOnce([]);
    });

    it('should return undefined', () => {
      expect(getLeafAdditionalTemplatesPath('additional/templates/path', ['external', 'type', 'path'])).toBeUndefined();
    });
  });
});
