import { asyncExec, getPackageManager, isProjectMonorepo, verboseLog } from '@repodog/cli-utils';
import { getPeerDependenciesToInstall } from './getPeerDependenciesToInstall.ts';
import { getRepoDogDevDependencyNames } from './getRepoDogDevDependencyNames.ts';

export const installRepoDogPeerDependencies = async (): Promise<string | undefined> => {
  // At this point in the code, getPackageManager will not return undefined.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const packageManager = getPackageManager()!;
  verboseLog('Getting @repodog devDependency names');
  const names = getRepoDogDevDependencyNames();
  verboseLog(`@repodog devDependency names: ${names.length > 0 ? names.join(', ') : 'none'}`);
  const toInstall: string[] = [];

  for (const name of names) {
    verboseLog(`Getting peerDependencies to install for ${name}`);
    const peerDependenciesToIntall = await getPeerDependenciesToInstall(name);

    if (peerDependenciesToIntall.length > 0) {
      const peerDependencies: string[] = [];

      for (const [peerName, peerSemver] of peerDependenciesToIntall) {
        peerDependencies.push(`${peerName}@^${peerSemver}`);
      }

      toInstall.push(...peerDependencies);
    }
  }

  if (toInstall.length === 0) {
    return;
  }

  const cmd = `${packageManager} add ${isProjectMonorepo(packageManager) ? '-w ' : ''}-D ${toInstall.join(' ')}`;
  verboseLog(`Executing cmd: "${cmd}`);
  return asyncExec(cmd);
};
