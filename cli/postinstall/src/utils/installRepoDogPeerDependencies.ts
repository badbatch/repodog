import { asyncExec, getPackageManager, verboseLog } from '@repodog/cli-utils';
import { getPeerDependenciesToInstall } from './getPeerDependenciesToInstall.ts';
import { getRepoDogDevDependencyNames } from './getRepoDogDevDependencyNames.ts';

export const installRepoDogPeerDependencies = async () => {
  const packageManager = getPackageManager()!;
  verboseLog('Getting @repodog devDependency names');
  const names = getRepoDogDevDependencyNames();
  verboseLog(`@repodog devDependency names: ${names.length > 0 ? names.join(', ') : 'none'}`);
  const runners: ReturnType<typeof import('@repodog/cli-utils')['asyncExec']>[] = [];

  for (const name of names) {
    verboseLog(`Getting peerDependencies to install for ${name}`);
    const peerDependenciesToIntall = await getPeerDependenciesToInstall(name);

    const cmd = `${packageManager} add -D ${peerDependenciesToIntall
      .map(([name, semver]) => `${name}@"${semver}"`)
      .join(' ')}`;

    verboseLog(`Executing cmd: "${cmd}`);
    runners.push(asyncExec(cmd));
  }

  return Promise.allSettled(runners);
};
