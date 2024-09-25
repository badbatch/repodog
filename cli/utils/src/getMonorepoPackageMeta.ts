import { getMonorepoPackageJsonPaths } from './getMonorepoPackageJsonPaths.ts';
import { loadPackageJson } from './loadPackageJson.ts';
import { type PackageManager, type PackageMetaRecord } from './types.ts';

export const getMonorepoPackageMeta = (packageManager: PackageManager, { filter }: { filter?: string } = {}) => {
  const packageJsonPaths = getMonorepoPackageJsonPaths(packageManager, { filter });
  const packageMetaRecord: PackageMetaRecord = {};

  for (const packageJsonPath of packageJsonPaths) {
    const { name } = loadPackageJson(packageJsonPath);

    packageMetaRecord[name] = {
      checked: false,
      force: false,
      name,
      path: packageJsonPath,
      versioned: false,
    };
  }

  return packageMetaRecord;
};
