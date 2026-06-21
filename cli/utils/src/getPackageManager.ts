import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadRepodogConfig } from '#repodogConfig.ts';
import { type PackageManager } from '#types.ts';

export const getPackageManager = (): PackageManager | undefined => {
  switch (true) {
    case existsSync(resolve(process.cwd(), 'package-lock.json')): {
      return 'npm';
    }

    case existsSync(resolve(process.cwd(), 'pnpm-lock.yaml')): {
      return 'pnpm';
    }

    case existsSync(resolve(process.cwd(), 'yarn.lock')): {
      return 'yarn';
    }

    default: {
      return loadRepodogConfig().packageManager;
    }
  }
};
