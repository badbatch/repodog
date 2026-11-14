import { describe, expect, it } from '@jest/globals';
import { isValidNewType } from '#isValidNewType.ts';

describe('isValidNewType', () => {
  it('When the type is app, then it is accepted', () => {
    // Arrange / Act / Assert
    expect(isValidNewType('app')).toBe(true);
  });

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
