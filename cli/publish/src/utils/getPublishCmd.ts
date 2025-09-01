import { PackageManager } from '@repodog/cli-utils';

export const getPublishCmd = (packageManager: PackageManager, version: string, tag?: string): string => {
  const tagArgument = tag ? ` --tag ${tag}` : '';

  switch (packageManager) {
    case PackageManager.NPM: {
      return `npm publish${tagArgument}`;
    }

    case PackageManager.PNPM: {
      return `pnpm publish --no-git-checks${tagArgument}`;
    }

    case PackageManager.YARN: {
      return `yarn publish --new-version ${version}${tagArgument}`;
    }
  }
};
