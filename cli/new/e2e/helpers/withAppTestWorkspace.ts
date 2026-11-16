import { setVerbose, verboseLog } from '@repodog/cli-utils';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const withAppTestWorkspace = async (run: (workspace: string) => Promise<void>): Promise<void> => {
  setVerbose(true);
  const workspace = await mkdtemp(join(tmpdir(), 'repodog-cli-e2e-'));
  verboseLog(`Generated application workspace: ${workspace}`);
  let isSucceeded = false;

  try {
    await run(workspace);
    isSucceeded = true;
  } finally {
    if (isSucceeded) {
      await rm(workspace, { force: true, recursive: true });
    } else {
      verboseLog(`Retained failed application workspace for inspection: ${workspace}`);
    }
  }
};
