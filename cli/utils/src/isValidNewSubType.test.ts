import { isValidNewSubType } from './isValidNewSubType.ts';
import { NewRepoSubtype, NewType } from './types.ts';

describe('isValidNewSubType', () => {
  it('should return true if subtype is a valid NewSubtype', () => {
    expect(isValidNewSubType(NewType.REPO, NewRepoSubtype.LIBRARY)).toBe(true);
  });

  it('should return false if subtype is not a valid NewSubtype', () => {
    expect(isValidNewSubType(NewType.REPO, 'invalid')).toBe(false);
  });
});
