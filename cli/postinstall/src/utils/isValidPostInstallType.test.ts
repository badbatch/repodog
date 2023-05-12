describe('isValidPostInstallType', () => {
  describe('when "pkg" is passed in', () => {
    it('should return true', async () => {
      const { isValidPostInstallType } = await import('./isValidPostInstallType.ts');
      expect(isValidPostInstallType('pkg')).toBe(true);
    });
  });

  describe('when "repo" is passed in', () => {
    it('should return true', async () => {
      const { isValidPostInstallType } = await import('./isValidPostInstallType.ts');
      expect(isValidPostInstallType('repo')).toBe(true);
    });
  });

  describe('when invalid type is passed in', () => {
    it('should return false', async () => {
      const { isValidPostInstallType } = await import('./isValidPostInstallType.ts');
      expect(isValidPostInstallType('foo')).toBe(false);
    });
  });
});
