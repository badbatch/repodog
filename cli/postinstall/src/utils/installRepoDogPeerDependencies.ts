import { asyncExec, getPackageManager } from '@repodog/cli-utils';
import { getPeerDependenciesToInstall } from './getPeerDependenciesToInstall.ts';
import { getRepoDogDevDependencyNames } from './getRepoDogDevDependencyNames.ts';

export const installRepoDogPeerDependencies = async () => {
  const packageManager = getPackageManager()!;
  const names = getRepoDogDevDependencyNames();
  const runners: ReturnType<typeof import('@repodog/cli-utils')['asyncExec']>[] = [];

  for (const name of names) {
    const peerDependenciesToIntall = await getPeerDependenciesToInstall(name);

    runners.push(
      asyncExec(
        `${packageManager} add -D ${peerDependenciesToIntall.map(([name, semver]) => `${name}@"${semver}"`).join(' ')}`
      )
    );
  }

  return Promise.allSettled(runners);
};
