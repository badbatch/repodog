import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadPackageJson } from './loadPackageJson.ts';
import { PackageManager, type PnpmWorkspaceYaml } from './types.ts';

export const isProjectMonorepo = (packageManager: PackageManager): boolean => {
  try {
    switch (packageManager) {
      case PackageManager.NPM:

      // eslint-disable-next-line no-fallthrough
      case PackageManager.YARN: {
        const packageJsonPath = resolve(process.cwd(), 'package.json');
        const packageJson = loadPackageJson(packageJsonPath);

        if (!packageJson.workspaces) {
          return false;
        }

        return Array.isArray(packageJson.workspaces)
          ? packageJson.workspaces.length > 0
          : !!packageJson.workspaces.packages?.length;
      }

      case PackageManager.PNPM: {
        const pnpmWorkspaceYamlPath = resolve(process.cwd(), 'pnpm-workspace.yaml');
        // load returns an unknown type and does not support generics.
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const pnpmWorkspaceYaml = load(readFileSync(pnpmWorkspaceYamlPath, { encoding: 'utf8' })) as PnpmWorkspaceYaml;
        return Array.isArray(pnpmWorkspaceYaml.packages) && pnpmWorkspaceYaml.packages.length > 0;
      }
    }
  } catch {
    return false;
  }
};
