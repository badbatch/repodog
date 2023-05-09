import { jest } from '@jest/globals';
import type { PackageJson, SetRequired } from 'type-fest';

jest.unstable_mockModule('./loadPackageJson.ts', () => ({
  loadPackageJson: jest.fn(),
}));

describe('isRunWithinProject', () => {
  let loadPackageJson: jest.Mocked<typeof import('./loadPackageJson.ts')['loadPackageJson']>;

  beforeEach(async () => {
    jest.clearAllMocks();
    ({ loadPackageJson } = jest.mocked(await import('./loadPackageJson.ts')));
  });

  it('should return true if package.json is found', async () => {
    loadPackageJson.mockReturnValueOnce({} as SetRequired<PackageJson, 'name' | 'version'>);
    const { isRunWithinProject } = await import('./isRunWithinProject.ts');
    expect(isRunWithinProject()).toBe(true);
  });

  it('should return false if package.json is not found', async () => {
    loadPackageJson.mockImplementationOnce(() => {
      throw new Error('Oops');
    });

    const { isRunWithinProject } = await import('./isRunWithinProject.ts');
    expect(isRunWithinProject()).toBe(false);
  });
});
