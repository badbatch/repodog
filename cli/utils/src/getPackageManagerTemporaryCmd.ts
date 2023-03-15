import { PackageManager } from './types.js';

export const getPackageManagerTemporaryCmd = (packageManager: PackageManager) => {
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
