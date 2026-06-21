import { jest } from '@jest/globals';
import { newRepoSubtype, newType } from '@repodog/cli-utils';

jest.unstable_mockModule('./installRepoDogPeerDependencies.ts', () => ({
  installRepoDogPeerDependencies: jest.fn(),
}));

const { installRepoDogPeerDependencies } = jest.mocked(await import('./installRepoDogPeerDependencies.ts'));
const { runCommonPostInstallTasks } = await import('./runCommonPostInstallTasks.ts');

describe('runCommonPostInstallTasks', () => {
  it('should call installRepoDogPeerDependencies', async () => {
    await runCommonPostInstallTasks(newType.PKG, newRepoSubtype.LIBRARY);
    expect(installRepoDogPeerDependencies).toHaveBeenCalledWith();
  });
});
