import {
  type ReleaseMeta,
  asyncExec,
  getLatestPackageVersionOnNpm,
  getPackageVersionsOnNpm,
  getTag,
  loadPackageJson,
  verboseLog,
} from '@repodog/cli-utils';
import { publishWithToken } from '#utils/publishWithToken.ts';
import { getPublishCmd } from './getPublishCmd.ts';

export const publishPackage = async (
  packageJsonPath: string,
  { packageManager }: Pick<ReleaseMeta, 'packageManager'>,
  changeWorkingDirCallback?: () => void,
): Promise<void> => {
  const { name, publishConfig, version } = loadPackageJson(packageJsonPath);

  if (publishConfig?.access !== 'public') {
    verboseLog('Package is not public, skipping publish');
    return;
  }

  const latestNpmPackageVersion = getLatestPackageVersionOnNpm(name);
  const packageVersionsOnNpm = getPackageVersionsOnNpm(name);
  const isTokenRequired = packageVersionsOnNpm.length === 0;
  verboseLog(`New version: ${version}`);
  verboseLog(`Latest non-prerelease version on npm: ${latestNpmPackageVersion || 'None'}`);
  verboseLog(`First publication/use token: ${String(isTokenRequired)}`);
  verboseLog(`NPM_AUTH_TOKEN available: ${String(Boolean(process.env.NPM_AUTH_TOKEN))}`);

  if (packageVersionsOnNpm.includes(version)) {
    verboseLog(`The new ${name} package verison ${version} is equal to a version on npm. Skipping publish.`);
    return;
  }

  changeWorkingDirCallback?.();
  const tag = getTag(version);
  verboseLog(`Tag: ${tag ?? 'None'}`);
  const publishCmd = getPublishCmd(packageManager, version, tag);

  if (isTokenRequired) {
    await publishWithToken(packageManager, publishCmd);
  } else {
    await asyncExec(publishCmd, { silent: true });
  }
};
