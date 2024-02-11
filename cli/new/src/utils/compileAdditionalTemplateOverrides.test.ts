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

describe('compileAdditionalTemplateOverrides', () => {
  it('should return the correct properties in the overrides object', async () => {
    const { compileAdditionalTemplateOverrides } = await import('./compileAdditionalTemplateOverrides.ts');

    expect(compileAdditionalTemplateOverrides('leafAdditionalTemplatesFiles', 'internalTempatesFiles')).toEqual({
      overrideTemplate_index_ejs_t: true,
      overrideTemplate_main_ejs_t: true,
      overrideTemplate_package_ejs_t: true,
      overrideTemplate_readme_ejs_t: false,
      overrideTemplate_tsconfig_build_ejs_t: false,
      overrideTemplate_tsconfig_ejs_t: true,
      overrideTemplate_types_ejs_t: false,
    });
  });
});
