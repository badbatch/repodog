import { asyncExec } from '@repodog/cli-utils';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const publishWithToken = async (publishCommand: string): Promise<void> => {
  const tempDir = await mkdtemp(join(tmpdir(), 'repodog-npm-'));
  const npmrcPath = join(tempDir, '.npmrc');

  try {
    await writeFile(npmrcPath, '//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}\n', { mode: 0o600 });

    await asyncExec(publishCommand, {
      env: {
        PNPM_CONFIG_NPMRC_AUTH_FILE: npmrcPath,
      },
    });
  } finally {
    await rm(tempDir, { force: true, recursive: true });
  }
};
