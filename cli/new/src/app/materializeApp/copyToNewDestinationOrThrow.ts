import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export const copyToNewDestinationOrThrow = async (staged: string, destination: string): Promise<void> => {
  let hasDestination = false;

  try {
    await mkdir(dirname(destination), { recursive: true });
    await mkdir(destination);
    hasDestination = true;
    const entries = await readdir(staged);

    for (const entry of entries) {
      await cp(resolve(staged, entry), resolve(destination, entry), {
        errorOnExist: true,
        force: false,
        recursive: true,
      });
    }
  } catch (error) {
    if (hasDestination) {
      await rm(destination, { force: true, recursive: true });
    }

    throw error;
  }
};
