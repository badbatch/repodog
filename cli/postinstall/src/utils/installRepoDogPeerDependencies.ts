import { asyncExec, getPackageManager, verboseLog } from '@repodog/cli-utils';
import { isString } from 'lodash-es';
import getPackageJsonFromNpmRegistry from 'package-json';
import { getPeerDependenciesToInstall } from './getPeerDependenciesToInstall.ts';
import { getRepoDogDevDependencyNames } from './getRepoDogDevDependencyNames.ts';

export const installRepoDogPeerDependencies = async () => {
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
        const packageJson = await getPackageJsonFromNpmRegistry(peerName, {
          version: `${Number(peerSemver.slice(1)) - 1}.x.x`,
        });

        if (isString(packageJson.version)) {
          peerDependencies.push(`${peerName}@^${packageJson.version}`);
        } else {
          verboseLog(`Peer dependency ${peerName} does not have a valid version`);
        }
      }

      toInstall.push(...peerDependencies);
    }
  }

  if (toInstall.length === 0) {
    return;
  }

  const cmd = `${packageManager} add -D ${toInstall.join(' ')}`;
  verboseLog(`Executing cmd: "${cmd}`);
  return asyncExec(cmd);
};
