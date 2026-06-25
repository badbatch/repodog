import { type PackageManager } from '#types.ts';

export const getPackageManagerFilterCommand = (
  packageManager: PackageManager,
): '--workspace' | '--filter' | 'workspaces foreach --from' => {
  switch (packageManager) {
    case 'npm': {
      return '--workspace';
    }

    case 'pnpm': {
      return '--filter';
    }

    case 'yarn': {
      return 'workspaces foreach --from';
    }
  }
};
