import { isPreRelease } from './isPreRelease.ts';

describe('isPreRelease', () => {
  describe('when valid pre release type is passed in', () => {
    it('should return true', () => {
      expect(isPreRelease('premajor')).toBe(true);
    });
  });

  describe('when valid pre release type is not passed in', () => {
    it('should return false', () => {
      expect(isPreRelease('major')).toBe(false);
    });
  });
});
