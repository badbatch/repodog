import { NewRepoSubtype, NewType } from './types.ts';

describe('isValidNewSubType', () => {
  let isValidNewSubType: typeof import('./isValidNewSubType.ts')['isValidNewSubType'];

  beforeEach(async () => {
    ({ isValidNewSubType } = await import('./isValidNewSubType.ts'));
  });

  it('should return true if subtype is a valid NewSubtype', () => {
    expect(isValidNewSubType(NewType.REPO, NewRepoSubtype.LIBRARY)).toBe(true);
  });

  it('should return false if subtype is not a valid NewSubtype', () => {
    expect(isValidNewSubType(NewType.REPO, 'invalid')).toBe(false);
  });
});
