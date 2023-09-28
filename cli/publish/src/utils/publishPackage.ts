import {
  type ReleaseMeta,
  getLatestPackageVersionOnNpm,
  getTag,
  loadPackageJson,
  verboseLog,
} from '@repodog/cli-utils';
import semver from 'semver';
import * as shelljs from 'shelljs';
import { getPublishCmd } from './getPublishCmd.ts';

export const publishPackage = (packageJsonPath: string, { packageManager }: Pick<ReleaseMeta, 'packageManager'>) => {
  const { name, publishConfig, version } = loadPackageJson(packageJsonPath);

  if (publishConfig?.access !== 'public') {
    verboseLog('Package is not public, skipping publish');
    return;
  }

  const latestNpmPackageVersion = getLatestPackageVersionOnNpm(name);
  verboseLog(`New version: ${version}`);
  verboseLog(`Latest version on npm: ${latestNpmPackageVersion || 'None'}`);

  if (latestNpmPackageVersion && (version === latestNpmPackageVersion || semver.lt(version, latestNpmPackageVersion))) {
    throw new Error(
      `The new ${name} package verison ${version} is less than or equal to the lastest version on npm: ${latestNpmPackageVersion}`
    );
  }

  const tag = getTag(version);
  verboseLog(`Tag: ${tag ?? 'None'}`);
  shelljs.exec(getPublishCmd(packageManager, version, tag));
};
