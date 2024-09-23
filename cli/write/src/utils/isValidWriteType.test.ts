import { isValidWriteType } from './isValidWriteType.ts';

describe('isValidWriteType', () => {
  it('should return true for a valid write type', () => {
    expect(isValidWriteType('test')).toBe(true);
  });

  it('should return false for an invalid write type', () => {
    expect(isValidWriteType('invalid')).toBe(false);
  });
});
