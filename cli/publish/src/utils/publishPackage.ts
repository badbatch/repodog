import {
  type ReleaseMeta,
  asyncExec,
  getLatestPackageVersionOnNpm,
  getTag,
  loadPackageJson,
  verboseLog,
} from '@repodog/cli-utils';
import { getPublishCmd } from './getPublishCmd.ts';

export const publishPackage = async (
  packageJsonPath: string,
  { packageManager }: Pick<ReleaseMeta, 'packageManager'>,
  changeWorkingDirCallback?: () => void,
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
      `The new ${name} package verison ${version} is equal to a version on npm: ${latestNpmPackageVersion}. Skipping publish.`,
    );

    return;
  }

  changeWorkingDirCallback?.();
  const tag = getTag(version);
  verboseLog(`Tag: ${tag ?? 'None'}`);
  await asyncExec(getPublishCmd(packageManager, version, tag));
};
