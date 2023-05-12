import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { PackageJson, SetRequired } from 'type-fest';
import { verboseLog } from './verboseLog.ts';

let packageJsonCache: Record<string, SetRequired<PackageJson, 'name' | 'version'>> = {};

export const addPackageJsonToCache = (path: string, packageJson: SetRequired<PackageJson, 'name' | 'version'>) => {
  packageJsonCache[path] = packageJson;
};

export const clearPackageJsonCache = () => {
  packageJsonCache = {};
};

export const getCachedPackageJsons = () => packageJsonCache;

export const loadPackageJson = (packageJsonPath: string) => {
  let sanitizedPackageJsonPath = packageJsonPath;

  if (!packageJsonPath.endsWith('package.json')) {
    sanitizedPackageJsonPath = resolve(packageJsonPath, 'package.json');
  }

  const cachedPackageJson = packageJsonCache[sanitizedPackageJsonPath];

  if (cachedPackageJson) {
    return cachedPackageJson;
  }

  let packageJson: PackageJson;

  try {
    packageJson = JSON.parse(readFileSync(sanitizedPackageJsonPath, { encoding: 'utf8' })) as PackageJson;
  } catch (error: unknown) {
    verboseLog(`Package.json read error: ${(error as Error).name}, ${(error as Error).message}`);
    throw new Error(`Could not resolve the package.json at: ${sanitizedPackageJsonPath}`);
  }

  const { name, version } = packageJson;

  if (!name) {
    throw new Error(`Expected the package.json at "${sanitizedPackageJsonPath}" to have a name`);
  }

  if (!version) {
    throw new Error(`Expected the package.json at "${sanitizedPackageJsonPath}" to have a version`);
  }

  const validatedPackageJson = packageJson as SetRequired<PackageJson, 'name' | 'version'>;
  packageJsonCache[sanitizedPackageJsonPath] = validatedPackageJson;
  return validatedPackageJson;
};
