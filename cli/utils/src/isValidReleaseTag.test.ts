import { isValidReleaseTag } from './isValidReleaseTag.ts';

describe('isValidReleaseTag', () => {
  describe('when valid release tag is passed in', () => {
    it('should return true', () => {
      expect(isValidReleaseTag('alpha')).toBe(true);
    });
  });

  describe('when valid release tag is not passed in', () => {
    it('should return false', () => {
      expect(isValidReleaseTag('charlie')).toBe(false);
    });
  });
});
