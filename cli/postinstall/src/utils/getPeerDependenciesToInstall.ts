import { verboseLog } from '@repodog/cli-utils';
import getPackageJsonFromNpmRegistry from 'package-json';
import { type PackageJson } from 'type-fest';

export const getPeerDependenciesToInstall = async (name: string) => {
  const nameAndVersion: [string, string][] = [];

  try {
    verboseLog(`Getting ${name} packageJson from npm registry`);
    const packageJson = (await getPackageJsonFromNpmRegistry(name)) as PackageJson;
    verboseLog(`${name} packageJson:\n${JSON.stringify(packageJson, undefined, 2)}`);

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
  } catch (error: unknown) {
    verboseLog(`Error getting ${name} peerDependencies`);

    if (error instanceof Error) {
      verboseLog(`Error name: ${error.name}`);
      verboseLog(`Error message: ${error.message}`);

      if (error.stack) {
        verboseLog(`Error stack: ${error.stack}`);
      }
    }

    return nameAndVersion;
  }
};
