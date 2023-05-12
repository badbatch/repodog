import { PostInstallSubType } from '../types.ts';

describe('isValidPostInstallSubType', () => {
  let isValidPostInstallSubType: typeof import('./isValidPostInstallSubType.ts')['isValidPostInstallSubType'];

  beforeEach(async () => {
    ({ isValidPostInstallSubType } = await import('./isValidPostInstallSubType.ts'));
  });

  it('should return true if subtype is a valid PostInstallSubType', () => {
    expect(isValidPostInstallSubType(PostInstallSubType.LIBRARY)).toBe(true);
  });

  it('should return false if subtype is not a valid PostInstallSubType', () => {
    expect(isValidPostInstallSubType('invalid')).toBe(false);
  });
});
