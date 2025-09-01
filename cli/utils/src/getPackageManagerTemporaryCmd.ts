import { PackageManager } from './types.ts';

export const getPackageManagerTemporaryCmd = (packageManager: PackageManager): 'npx' | 'pnpm dlx' | 'yarn dlx' => {
  switch (packageManager) {
    case PackageManager.NPM: {
      return 'npx';
    }

    case PackageManager.PNPM: {
      return 'pnpm dlx';
    }

    case PackageManager.YARN: {
      return 'yarn dlx';
    }
  }
};
