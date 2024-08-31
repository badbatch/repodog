import { ReleaseTag } from './types.ts';

describe('getNewVersion', () => {
  describe('when there is a tag', () => {
    it('should return the correct new version', async () => {
      const { getNewVersion } = await import('./getNewVersion.ts');
      expect(getNewVersion('1.0.0', 'premajor', ReleaseTag.PULL_REQUEST)).toBe('2.0.0-pr.0');
    });

    describe('when type is "prerelease"', () => {
      it('should return the correct new version', async () => {
        const { getNewVersion } = await import('./getNewVersion.ts');
        expect(getNewVersion('2.0.0-pr.4', 'prerelease', ReleaseTag.PULL_REQUEST)).toBe('2.0.0-pr.5');
      });
    });

    describe('when there is an identifier', () => {
      it('should return the correct new version', async () => {
        const { getNewVersion } = await import('./getNewVersion.ts');

        expect(getNewVersion('2.0.1-pr-12345.0', 'prerelease', ReleaseTag.PULL_REQUEST, '12345')).toBe(
          '2.0.1-pr-12345.1',
        );
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
