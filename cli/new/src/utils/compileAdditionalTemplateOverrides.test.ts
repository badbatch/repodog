import { jest } from '@jest/globals';

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  verboseLog: jest.fn(),
}));

const files = {
  internalTempatesFiles: [
    'index.ejs.t',
    'main.ejs.t',
    'package.ejs.t',
    'readme.ejs.t',
    'tsconfig.build.ejs.t',
    'tsconfig.ejs.t',
    'types.ejs.t',
  ],
  leafAdditionalTemplatesFiles: ['index.ejs.t', 'main.ejs.t', 'package.ejs.t', 'tsconfig.ejs.t'],
};

jest.unstable_mockModule('node:fs', () => ({
  readdirSync: jest.fn<(path: keyof typeof files) => string[]>().mockImplementation(path => files[path]),
}));

const { compileAdditionalTemplateOverrides } = await import('./compileAdditionalTemplateOverrides.ts');

describe('compileAdditionalTemplateOverrides', () => {
  it('should return the correct properties in the overrides object', () => {
    expect(compileAdditionalTemplateOverrides('leafAdditionalTemplatesFiles', 'internalTempatesFiles')).toEqual({
      overrideTemplate_index_ejs_t: true,
      overrideTemplate_main_ejs_t: true,
      overrideTemplate_package_ejs_t: true,
      overrideTemplate_tsconfig_ejs_t: true,
    });
  });
});
