import { resolveAbsolutePath } from '@repodog/cli-utils';
import { existsSync } from 'node:fs';
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

  return absolutePath;
};
