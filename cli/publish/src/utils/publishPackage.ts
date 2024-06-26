import {
  type ReleaseMeta,
  getLatestPackageVersionOnNpm,
  getTag,
  loadPackageJson,
  verboseLog,
} from '@repodog/cli-utils';
import shelljs from 'shelljs';
import { getPublishCmd } from './getPublishCmd.ts';

export const publishPackage = (
  packageJsonPath: string,
  { packageManager }: Pick<ReleaseMeta, 'packageManager'>,
  changeWorkingDirCallback?: () => void
) => {
  const { name, publishConfig, version } = loadPackageJson(packageJsonPath);

  if (publishConfig?.access !== 'public') {
    verboseLog('Package is not public, skipping publish');
    return;
  }

  const latestNpmPackageVersion = getLatestPackageVersionOnNpm(name);
  verboseLog(`New version: ${version}`);
  verboseLog(`Latest version on npm: ${latestNpmPackageVersion || 'None'}`);

  if (latestNpmPackageVersion && version === latestNpmPackageVersion) {
    verboseLog(
      `The new ${name} package verison ${version} is equal to a version on npm: ${latestNpmPackageVersion}. Skipping publish.`
    );

    return;
  }

  changeWorkingDirCallback?.();
  const tag = getTag(version);
  verboseLog(`Tag: ${tag ?? 'None'}`);
  shelljs.exec(getPublishCmd(packageManager, version, tag));
};
