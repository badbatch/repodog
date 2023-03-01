import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { PackageManager } from './types.js';

export const getPackageManager = (): PackageManager | undefined => {
  switch (true) {
    case existsSync(resolve(process.cwd(), 'package-lock.json')): {
      return PackageManager.NPM;
    }

    case existsSync(resolve(process.cwd(), 'pnpm-lock.yaml')): {
      return PackageManager.PNPM;
    }

    case existsSync(resolve(process.cwd(), 'yarn.lock')): {
      return PackageManager.YARN;
    }

    default: {
      return undefined;
    }
  }
};
