import { ReleaseTag } from './types.ts';

describe('getNewVersion', () => {
  describe('when there is a tag', () => {
    it('should return the correct new version', async () => {
      const { getNewVersion } = await import('./getNewVersion.ts');
      expect(getNewVersion('1.0.0', 'premajor', ReleaseTag.ALPHA)).toBe('2.0.0-alpha');
    });

    describe('when type is "prerelease"', () => {
      it('should return the correct new version', async () => {
        const { getNewVersion } = await import('./getNewVersion.ts');
        expect(getNewVersion('2.0.0-alpha.1', 'prerelease')).toBe('2.0.0-alpha.2');
      });
    });

    describe('when there is an identifier', () => {
      it('should return the correct new version', async () => {
        const { getNewVersion } = await import('./getNewVersion.ts');
        expect(getNewVersion('2.0.0-alpha', 'prepatch', ReleaseTag.ALPHA, '1234567')).toBe('2.0.1-alpha-1234567');
      });
    });
  });

  describe('when there is no tag', () => {
    it('should return the correct new version', async () => {
      const { getNewVersion } = await import('./getNewVersion.ts');
      expect(getNewVersion('1.0.0', 'major')).toBe('2.0.0');
    });
  });
});
