import { PackageManager } from './types.ts';

export const getPackageManagerFilterCmd = (
  packageManager: PackageManager,
): '--workspace' | '--filter' | 'workspaces foreach --from' => {
  switch (packageManager) {
    case PackageManager.NPM: {
      return '--workspace';
    }

    case PackageManager.PNPM: {
      return '--filter';
    }

    case PackageManager.YARN: {
      return 'workspaces foreach --from';
    }
  }
};
