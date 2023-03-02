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

    const { convertTemplateVariablesToCliOptions } = await import('./convertTemplateVariablesToCliOptions.js');

    expect(convertTemplateVariablesToCliOptions(object, ['new', 'pkg'])).toBe(
      '--alpha foxtrot --foxtrot golf --charlie 23 --hotel --delta'
    );
  });
});
