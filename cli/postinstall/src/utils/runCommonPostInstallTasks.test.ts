import { jest } from '@jest/globals';
import { PostInstallSubType, PostInstallType } from '../types.ts';

jest.unstable_mockModule('./installRepoDogPeerDependencies.ts', () => ({
  installRepoDogPeerDependencies: jest.fn(),
}));

describe('runCommonPostInstallTasks', () => {
  it('should call installRepoDogPeerDependencies', async () => {
    const { installRepoDogPeerDependencies } = jest.mocked(await import('./installRepoDogPeerDependencies.ts'));
    const { runCommonPostInstallTasks } = await import('./runCommonPostInstallTasks.ts');
    await runCommonPostInstallTasks(PostInstallType.PKG, PostInstallSubType.LIBRARY);
    expect(installRepoDogPeerDependencies).toHaveBeenCalledWith();
  });
});
