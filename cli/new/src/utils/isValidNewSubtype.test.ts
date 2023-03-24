import { jest } from '@jest/globals';
import { NewRepoSubtype, NewType } from '../types.js';

describe('isValidNewSubtype', () => {
  let isValidNewSubtype: (type: NewType, subtype?: string) => boolean;

  beforeEach(async () => {
    jest.resetModules();
    ({ isValidNewSubtype } = await import('./isValidNewSubtype.js'));
  });

  describe('when type is REPO', () => {
    it('should return true if subtype is a valid NewRepoSubtype', () => {
      expect(isValidNewSubtype(NewType.REPO, NewRepoSubtype.APP)).toBe(true);
    });

    it('should return false if subtype is not a valid NewRepoSubtype', () => {
      expect(isValidNewSubtype(NewType.REPO, 'invalid')).toBe(false);
    });
  });

  describe('when type is PKG', () => {
    it('should return false if subtype is an empty string', () => {
      expect(isValidNewSubtype(NewType.PKG)).toBe(false);
    });

    it('should return false if subtype is not an empty string', () => {
      expect(isValidNewSubtype(NewType.PKG, 'invalid')).toBe(false);
    });
  });
});
