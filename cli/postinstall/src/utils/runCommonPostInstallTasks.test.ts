import { jest } from '@jest/globals';
import { NewRepoSubtype, NewType } from '@repodog/cli-utils';

jest.unstable_mockModule('./installRepoDogPeerDependencies.ts', () => ({
  installRepoDogPeerDependencies: jest.fn(),
}));

describe('runCommonPostInstallTasks', () => {
  it('should call installRepoDogPeerDependencies', async () => {
    const { installRepoDogPeerDependencies } = jest.mocked(await import('./installRepoDogPeerDependencies.ts'));
    const { runCommonPostInstallTasks } = await import('./runCommonPostInstallTasks.ts');
    await runCommonPostInstallTasks(NewType.PKG, NewRepoSubtype.LIBRARY);
    expect(installRepoDogPeerDependencies).toHaveBeenCalledWith();
  });
});
