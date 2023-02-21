describe('isPreRelease', () => {
  describe('when valid pre release type is passed in', () => {
    it('should return true', async () => {
      const { isPreRelease } = await import('./isPreRelease.js');
      expect(isPreRelease('premajor')).toBe(true);
    });
  });

  describe('when valid pre release type is not passed in', () => {
    it('should return false', async () => {
      const { isPreRelease } = await import('./isPreRelease.js');
      expect(isPreRelease('major')).toBe(false);
    });
  });
});
