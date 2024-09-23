import { jest } from '@jest/globals';
import { type PackageJson, type SetRequired } from 'type-fest';

jest.unstable_mockModule('./loadPackageJson.ts', () => ({
  loadPackageJson: jest.fn(),
}));

const { loadPackageJson } = jest.mocked(await import('./loadPackageJson.ts'));
const { isRunWithinProject } = await import('./isRunWithinProject.ts');

describe('isRunWithinProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if package.json is found', () => {
    loadPackageJson.mockReturnValueOnce({} as SetRequired<PackageJson, 'name' | 'version'>);
    expect(isRunWithinProject()).toBe(true);
  });

  it('should return false if package.json is not found', () => {
    loadPackageJson.mockImplementationOnce(() => {
      throw new Error('Oops');
    });

    expect(isRunWithinProject()).toBe(false);
  });
});
