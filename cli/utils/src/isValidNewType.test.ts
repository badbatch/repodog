import { isValidNewType } from './isValidNewType.ts';

describe('isValidNewType', () => {
  describe('when "pkg" is passed in', () => {
    it('should return true', () => {
      expect(isValidNewType('pkg')).toBe(true);
    });
  });

  describe('when "repo" is passed in', () => {
    it('should return true', () => {
      expect(isValidNewType('repo')).toBe(true);
    });
  });

  describe('when invalid type is passed in', () => {
    it('should return false', () => {
      expect(isValidNewType('foo')).toBe(false);
    });
  });
});
