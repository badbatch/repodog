import { isValidReleaseType } from './isValidReleaseType.ts';

describe('isValidReleaseType', () => {
  describe('when valid release type is passed in', () => {
    it('should return true', () => {
      expect(isValidReleaseType('major')).toBe(true);
    });
  });

  describe('when valid release type is not passed in', () => {
    it('should return false', () => {
      expect(isValidReleaseType('alpha')).toBe(false);
    });
  });
});
