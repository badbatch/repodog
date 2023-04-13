describe('injectFileExtension', () => {
  it('should add .ts extension to relative import paths without extension', async () => {
    const { injectFileExtension } = await import('./injectFileExtension.ts');

    const inputCode = `
      import { someFunction } from './someModule';
      import { anotherFunction } from './anotherModule.ts';
      import { thirdFunction } from '../dir/thirdModule';
      import { fourthFunction } from 'fourthModule';
    `;

    const expectedCode = `
      import { someFunction } from './someModule.ts';
      import { anotherFunction } from './anotherModule.ts';
      import { thirdFunction } from '../dir/thirdModule.ts';
      import { fourthFunction } from 'fourthModule';
    `;

    expect(injectFileExtension(inputCode)).toEqual(expectedCode);
  });

  it('should not modify import paths that already have extensions', async () => {
    const { injectFileExtension } = await import('./injectFileExtension.ts');

    const inputCode = `
      import { someFunction } from './someModule.ts';
      import { anotherFunction } from '../dir/anotherModule.ts';
      import { thirdFunction } from 'thirdModule.css';
    `;

    expect(injectFileExtension(inputCode)).toEqual(inputCode);
  });
});
