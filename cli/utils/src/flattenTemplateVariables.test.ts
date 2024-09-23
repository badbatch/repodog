import { flattenTemplateVariables } from './flattenTemplateVariables.ts';

describe('flattenTemplateVariables', () => {
  it('should convert the object correctly', () => {
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

    expect(flattenTemplateVariables(object, ['new', 'pkg'])).toEqual({
      alpha: 'foxtrot',
      charlie: 23,
      delta: true,
      echo: false,
      foxtrot: 'golf',
      hotel: true,
    });
  });
});
