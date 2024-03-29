describe('isValidReleaseTag', () => {
  describe('when valid release tag is passed in', () => {
    it('should return true', async () => {
      const { isValidReleaseTag } = await import('./isValidReleaseTag.ts');
      expect(isValidReleaseTag('alpha')).toBe(true);
    });
  });

  describe('when valid release tag is not passed in', () => {
    it('should return false', async () => {
      const { isValidReleaseTag } = await import('./isValidReleaseTag.ts');
      expect(isValidReleaseTag('charlie')).toBe(false);
    });
  });
});
