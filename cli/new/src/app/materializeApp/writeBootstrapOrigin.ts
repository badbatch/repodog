import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { type BootstrapOrigin } from '../types.ts';

export const writeBootstrapOrigin = async (staged: string, origin: BootstrapOrigin): Promise<void> => {
  await writeFile(resolve(staged, '.repodog-origin.json'), `${JSON.stringify(origin, undefined, 2)}\n`);
};
