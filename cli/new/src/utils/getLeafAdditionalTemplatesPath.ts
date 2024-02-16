import { resolveAbsolutePath } from '@repodog/cli-utils';
import { existsSync, readdirSync } from 'node:fs';
import { sep } from 'node:path';

export const getLeafAdditionalTemplatesPath = (
  additionalTemplatesPath: string | undefined,
  externalTypePath: string[]
) => {
  if (!additionalTemplatesPath) {
    return;
  }

  const absolutePath = resolveAbsolutePath([additionalTemplatesPath, ...externalTypePath].join(sep));

  if (!existsSync(absolutePath)) {
    return;
  }

  const dirents = readdirSync(absolutePath, { withFileTypes: true });
  const files = dirents.filter(dirent => dirent.isFile());

  if (files.length === 0) {
    return;
  }

  return absolutePath;
};
