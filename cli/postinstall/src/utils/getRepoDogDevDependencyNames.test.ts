import { jest } from '@jest/globals';

const packageJsonMap = {
  '/root': {
    devDependencies: {
      '@repodog/alpha': '<8',
      '@repodog/bravo': '<1',
      '@repodog/charlie': '<2',
      '@repodog/delta': '<10',
    },
    name: 'alpha',
    version: '0.0.1',
  },
};

jest.unstable_mockModule('@repodog/cli-utils', () => ({
  loadPackageJson: jest.fn().mockImplementation(path => packageJsonMap[path as keyof typeof packageJsonMap]),
}));

process.cwd = () => '/root';
const { getRepoDogDevDependencyNames } = await import('./getRepoDogDevDependencyNames.ts');

describe('getRepoDogDevDependencyNames', () => {
  it('should return the names of all repodog devDependencies', () => {
    expect(getRepoDogDevDependencyNames()).toEqual([
      '@repodog/alpha',
      '@repodog/bravo',
      '@repodog/charlie',
      '@repodog/delta',
    ]);
  });
});
