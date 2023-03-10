describe('isValidNewType', () => {
  it('should return true for valid new types', async () => {
    const { isValidNewType } = await import('./isValidNewType.js');
    expect(isValidNewType('pkg')).toBe(true);
    expect(isValidNewType('repo')).toBe(true);
  });

  it('should return false for invalid new types', async () => {
    const { isValidNewType } = await import('./isValidNewType.js');
    expect(isValidNewType('foo')).toBe(false);
    expect(isValidNewType('bar')).toBe(false);
  });

  it('should use the correct list of valid new types', async () => {
    const { VALID_NEW_TYPES } = await import('./isValidNewType.js');
    expect(VALID_NEW_TYPES).toContain('pkg');
    expect(VALID_NEW_TYPES).toContain('repo');
    expect(VALID_NEW_TYPES).not.toContain('foo');
    expect(VALID_NEW_TYPES).not.toContain('bar');
  });
});
