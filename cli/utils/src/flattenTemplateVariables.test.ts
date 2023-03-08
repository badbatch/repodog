describe('convertObjectToCliOptions', () => {
  it('should convert the object correctly', async () => {
    const object = {
      '*': {
        alpha: 'bravo',
        foxtrot: 'golf',
      },
      new: {
        '*': {
          charlie: 2,
          hotel: true,
        },
        pkg: {
          alpha: 'foxtrot',
          charlie: 23,
          delta: true,
          echo: false,
        },
      },
    };

    const { flattenTemplateVariables: flattenAndMergeTemplateVariables } = await import(
      './flattenTemplateVariables.js'
    );

    expect(flattenAndMergeTemplateVariables(object, ['new', 'pkg'])).toEqual({
      alpha: 'foxtrot',
      charlie: 23,
      delta: true,
      echo: false,
      foxtrot: 'golf',
      hotel: true,
    });
  });
});
