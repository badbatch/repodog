import { asyncExec } from '@repodog/cli-utils';
import type { PackageJson } from 'type-fest';

export const getLatestCompatibleVersion = async (name: string, semver: string) => {
  try {
    const output = JSON.parse(await asyncExec(`npm view ${name}@"${semver}" --json`)) as PackageJson[];
    return output.slice(-1)[0]?.version;
  } catch {
    return;
  }
};
