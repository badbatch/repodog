import { verboseLog } from '@repodog/cli-utils';
import { type PackageJson } from 'type-fest';

export const getPeerDependenciesToInstall = async (name: string) => {
  const nameAndVersion: [string, string][] = [];

  try {
    verboseLog(`Getting ${name} peerDependency names`);
    const packageJson = (await import(`${name}/package.json`)) as PackageJson;

    if (!packageJson.peerDependencies) {
      verboseLog(`${name} peerDependencies: 'none'`);
      return nameAndVersion;
    }

    for (const peer in packageJson.peerDependencies) {
      const version = packageJson.peerDependencies[peer];

      if (version) {
        nameAndVersion.push([peer, version]);
      }
    }

    verboseLog(`${name} peerDependencies: ${nameAndVersion.join(', ')}`);
    return nameAndVersion;
  } catch {
    return nameAndVersion;
  }
};
