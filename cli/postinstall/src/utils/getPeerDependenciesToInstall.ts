import { verboseLog } from '@repodog/cli-utils';
import getPackageJsonFromNpmRegistry from 'package-json';
import { type PackageJson } from 'type-fest';
import { getLatestCompatibleVersion } from './getLatestCompatibleVersion.ts';

export const getPeerDependenciesToInstall = async (name: string) => {
  const nameAndVersion: [string, string][] = [];

  try {
    verboseLog(`Getting ${name} packageJson from npm registry`);
    // Library does not allow for return value being undefined.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const packageJson = (await getPackageJsonFromNpmRegistry<PackageJson>(name)) as PackageJson | undefined;

    if (!packageJson) {
      return nameAndVersion;
    }

    verboseLog(`${name} packageJson:\n${JSON.stringify(packageJson, undefined, 2)}`);

    if (!packageJson.peerDependencies) {
      verboseLog(`${name} peerDependencies: 'none'`);
      return nameAndVersion;
    }

    for (const peer in packageJson.peerDependencies) {
      const semver = packageJson.peerDependencies[peer];

      if (semver) {
        const compatibleVersion = await getLatestCompatibleVersion(peer, semver);

        if (compatibleVersion) {
          nameAndVersion.push([peer, compatibleVersion]);
        }
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
