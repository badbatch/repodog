import { NewRepoSubtype, NewType } from '../types.ts';

describe('isValidNewSubtype', () => {
  let isValidNewSubtype: typeof import('./isValidNewSubtype.ts')['isValidNewSubtype'];

  beforeEach(async () => {
    ({ isValidNewSubtype } = await import('./isValidNewSubtype.ts'));
  });

  describe('when type is REPO', () => {
    it('should return true if subtype is a valid NewRepoSubtype', () => {
      expect(isValidNewSubtype(NewType.REPO, NewRepoSubtype.LIBRARY)).toBe(true);
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
