describe('isValidNewType', () => {
  describe('when "pkg" is passed in', () => {
    it('should return true', async () => {
      const { isValidNewType } = await import('./isValidNewType.ts');
      expect(isValidNewType('pkg')).toBe(true);
    });
  });

  describe('when "repo" is passed in', () => {
    it('should return true', async () => {
      const { isValidNewType } = await import('./isValidNewType.ts');
      expect(isValidNewType('repo')).toBe(true);
    });
  });

  describe('when invalid type is passed in', () => {
    it('should return false', async () => {
      const { isValidNewType } = await import('./isValidNewType.ts');
      expect(isValidNewType('foo')).toBe(false);
    });
  });
});
