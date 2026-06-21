import { type PackageManager } from '#types.ts';

export const getPackageManagerTemporaryCommand = (packageManager: PackageManager): 'npx' | 'pnpm dlx' | 'yarn dlx' => {
  switch (packageManager) {
    case 'npm': {
      return 'npx';
    }

    case 'pnpm': {
      return 'pnpm dlx';
    }

    case 'yarn': {
      return 'yarn dlx';
    }
  }
};
