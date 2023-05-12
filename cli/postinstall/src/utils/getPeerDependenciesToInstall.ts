import { type PackageJson } from 'type-fest';

export const getPeerDependenciesToInstall = async (name: string) => {
  const nameAndVersion: [string, string][] = [];

  try {
    const packageJson = (await import(`${name}/package.json`)) as PackageJson;

    if (!packageJson.peerDependencies) {
      return nameAndVersion;
    }

    for (const peer in packageJson.peerDependencies) {
      const version = packageJson.peerDependencies[peer];

      if (version) {
        nameAndVersion.push([peer, version]);
      }
    }

    return nameAndVersion;
  } catch {
    return nameAndVersion;
  }
};
