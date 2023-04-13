describe('isValidReleaseType', () => {
  describe('when valid release type is passed in', () => {
    it('should return true', async () => {
      const { isValidReleaseType } = await import('./isValidReleaseType.ts');
      expect(isValidReleaseType('major')).toBe(true);
    });
  });

  describe('when valid release type is not passed in', () => {
    it('should return false', async () => {
      const { isValidReleaseType } = await import('./isValidReleaseType.ts');
      expect(isValidReleaseType('alpha')).toBe(false);
    });
  });
});
