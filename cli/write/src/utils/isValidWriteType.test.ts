describe('isValidWriteType', () => {
  it('should return true for a valid write type', async () => {
    const { isValidWriteType } = await import('./isValidWriteType.ts');
    expect(isValidWriteType('test')).toBe(true);
  });

  it('should return false for an invalid write type', async () => {
    const { isValidWriteType } = await import('./isValidWriteType.ts');
    expect(isValidWriteType('invalid')).toBe(false);
  });
});
