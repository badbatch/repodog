// This is a test file so non-null assertions are acceptable.
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { jest } from '@jest/globals';
import { type PackageJson } from 'type-fest';

export type LoadPackageJsonMockResult = {
  loadPackageJson: (value: string) => PackageJson;
};

export const loadPackageJsonMock = (): LoadPackageJsonMockResult => ({
  loadPackageJson: jest.fn<(value: string) => PackageJson>().mockImplementation((path: string) => {
    const match = /\/([a-z]+)\/package.json$/.exec(path)!;

    return {
      name: match[1]!,
      publishConfig: { access: 'public' },
      version: '1.0.0',
    };
  }),
});
