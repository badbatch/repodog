import { describe, expect, it } from '@jest/globals';
import { newAppSubtype, newRepoSubtype, newType } from '#constants.ts';
import { isValidNewSubtype } from '#isValidNewSubtype.ts';

describe('isValidNewSubType', () => {
  it('should return true if subtype is a valid NewSubtype', () => {
    expect(isValidNewSubtype(newType.REPO, newRepoSubtype.LIBRARY)).toBe(true);
  });

  it('should return false if subtype is not a valid NewSubtype', () => {
    expect(isValidNewSubtype(newType.REPO, 'invalid')).toBe(false);
  });

  it.each(Object.values(newAppSubtype))('When the app subtype is %s, then it is accepted', subtype => {
    // Arrange / Act / Assert
    expect(isValidNewSubtype(newType.APP, subtype)).toBe(true);
  });
});
