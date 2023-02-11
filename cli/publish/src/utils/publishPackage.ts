import { type ReleaseMeta, getLatestPackageVersionOnNpm, getTag, loadPackageJson } from '@repodog/cli-utils';
import semver from 'semver';
import shelljs from 'shelljs';
import { getPublishCmd } from './getPublishCmd.js';

export const publishPackage = (packageJsonPath: string, { packageManager }: Pick<ReleaseMeta, 'packageManager'>) => {
  const { name, version } = loadPackageJson(packageJsonPath);
  const latestNpmPackageVersion = getLatestPackageVersionOnNpm(name);

  if (latestNpmPackageVersion && (version === latestNpmPackageVersion || semver.lt(version, latestNpmPackageVersion))) {
    throw new Error(
      `The new ${name} package verison ${version} is less than or equal to the lastest version on npm: ${latestNpmPackageVersion}`
    );
  }

  const tag = getTag(version);
  shelljs.exec(getPublishCmd(packageManager, version, tag));
};
