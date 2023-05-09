describe('buildTypePaths', () => {
  describe('when a no subtype or customTypePath is provided', () => {
    it('should return the correct type paths', async () => {
      const { buildTypePaths } = await import('./buildTypePaths.ts');

      expect(buildTypePaths('alpha')).toEqual({
        configTypePath: ['new', 'alpha'],
        externalTypePath: ['new', 'alpha'],
        internalTypePath: ['alpha'],
      });
    });
  });

  describe('when a subtype is provided', () => {
    it('should return the correct type paths', async () => {
      const { buildTypePaths } = await import('./buildTypePaths.ts');

      expect(buildTypePaths('alpha', 'bravo')).toEqual({
        configTypePath: ['new', 'alpha', 'bravo'],
        externalTypePath: ['new', 'alpha', 'bravo'],
        internalTypePath: ['alpha', 'bravo'],
      });
    });
  });

  describe('when a customTypePath is provided', () => {
    it('should return the correct type paths', async () => {
      const { buildTypePaths } = await import('./buildTypePaths.ts');

      expect(buildTypePaths('alpha', undefined, 'charlie.delta')).toEqual({
        configTypePath: ['new', 'alpha', 'charlie', 'delta'],
        externalTypePath: ['new', 'alpha', 'charlie', 'delta'],
        internalTypePath: ['alpha'],
      });
    });
  });

  describe('when a subtype and customTypePath is provided', () => {
    it('should return the correct type paths', async () => {
      const { buildTypePaths } = await import('./buildTypePaths.ts');

      expect(buildTypePaths('alpha', 'bravo', 'charlie.delta')).toEqual({
        configTypePath: ['new', 'alpha', 'bravo', 'charlie', 'delta'],
        externalTypePath: ['new', 'alpha', 'bravo', 'charlie', 'delta'],
        internalTypePath: ['alpha', 'bravo'],
      });
    });
  });
});
