import { type PackageManager, asyncExec } from '@repodog/cli-utils';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const filePathEnv: Record<PackageManager, string> = {
  npm: 'NPM_CONFIG_USERCONFIG',
  pnpm: 'PNPM_CONFIG_NPMRC_AUTH_FILE',
  yarn: 'NPM_CONFIG_USERCONFIG',
};

export const publishWithToken = async (packageManager: PackageManager, publishCommand: string): Promise<void> => {
  const tempDir = await mkdtemp(join(tmpdir(), 'repodog-npm-'));
  const npmrcPath = join(tempDir, '.npmrc');

  try {
    await writeFile(npmrcPath, '//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}\n', { mode: 0o600 });
    const FILE_PATH = filePathEnv[packageManager];

    await asyncExec(publishCommand, {
      env: {
        [FILE_PATH]: npmrcPath,
      },
    });
  } finally {
    await rm(tempDir, { force: true, recursive: true });
  }
};
