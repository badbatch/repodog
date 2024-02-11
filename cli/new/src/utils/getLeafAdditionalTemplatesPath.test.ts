import { jest } from '@jest/globals';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  resolveAbsolutePath: jest.fn().mockImplementation(path => path),
}));

jest.unstable_mockModule('node:fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
}));

describe('getLeafAdditionalTemplatesPath', () => {
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

  it('should return the correct absolute path', async () => {
    const { getLeafAdditionalTemplatesPath } = await import('./getLeafAdditionalTemplatesPath.ts');

    expect(getLeafAdditionalTemplatesPath('./additional/templates/path', ['external', 'type', 'path'])).toBe(
      './additional/templates/path/external/type/path'
    );
  });
});
