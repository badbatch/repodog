import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { type PackageJson, type SetRequired } from 'type-fest';
import { verboseLog } from './verboseLog.ts';

type PackageJsonWithNameVersionRequired = SetRequired<PackageJson, 'name' | 'version'>;

let packageJsonCache: Record<string, PackageJsonWithNameVersionRequired> = {};

export const addPackageJsonToCache = (key: string, packageJson: PackageJsonWithNameVersionRequired): void => {
  packageJsonCache[key] = packageJson;
};

export const clearPackageJsonCache = (): void => {
  packageJsonCache = {};
};

export const getCachedPackageJsons = (): Record<string, PackageJsonWithNameVersionRequired> => packageJsonCache;

export const loadPackageJson = (packageJsonPath: string): PackageJsonWithNameVersionRequired => {
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
    // JSON.parse returns an any type.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    packageJson = JSON.parse(readFileSync(sanitizedPackageJsonPath, { encoding: 'utf8' })) as PackageJson;
  } catch (error: unknown) {
    // catch arg has to be of type unknown, but in this context it will
    // always be of type Error.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
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

  // typescript struggling to drive name and version are
  // required after above checks.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const validatedPackageJson = packageJson as SetRequired<PackageJson, 'name' | 'version'>;
  packageJsonCache[sanitizedPackageJsonPath] = validatedPackageJson;
  return validatedPackageJson;
};
