import { jest } from '@jest/globals';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  resolveAbsolutePath: jest.fn().mockImplementation(path => path),
}));

const isFile = jest.fn().mockReturnValue(true);

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readdirSync: jest.fn().mockReturnValue([{ isFile }, { isFile }, { isFile }]),
}));

describe('getLeafAdditionalTemplatesPath', () => {
  it('should return the correct absolute path', async () => {
    const { getLeafAdditionalTemplatesPath } = await import('./getLeafAdditionalTemplatesPath.ts');

    expect(getLeafAdditionalTemplatesPath('./additional/templates/path', ['external', 'type', 'path'])).toBe(
      './additional/templates/path/external/type/path',
    );
  });

  describe('when there is no additionalTemplatesPath', () => {
    it('should return undefined', async () => {
      const { getLeafAdditionalTemplatesPath } = await import('./getLeafAdditionalTemplatesPath.ts');
      expect(getLeafAdditionalTemplatesPath(undefined, ['external', 'type', 'path'])).toBeUndefined();
    });
  });

  describe('when the absolute path does not exist', () => {
    beforeEach(async () => {
      const { existsSync } = jest.mocked(await import('node:fs'));
      existsSync.mockReturnValueOnce(false);
    });

    it('should return undefined', async () => {
      const { getLeafAdditionalTemplatesPath } = await import('./getLeafAdditionalTemplatesPath.ts');
      expect(getLeafAdditionalTemplatesPath('additional/templates/path', ['external', 'type', 'path'])).toBeUndefined();
    });
  });

  describe('when the path does not contain any files', () => {
    beforeEach(async () => {
      const { readdirSync } = jest.mocked(await import('node:fs'));
      readdirSync.mockReturnValueOnce([]);
    });

    it('should return undefined', async () => {
      const { getLeafAdditionalTemplatesPath } = await import('./getLeafAdditionalTemplatesPath.ts');
      expect(getLeafAdditionalTemplatesPath('additional/templates/path', ['external', 'type', 'path'])).toBeUndefined();
    });
  });
});
