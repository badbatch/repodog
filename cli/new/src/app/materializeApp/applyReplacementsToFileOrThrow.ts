import { readFile, writeFile } from 'node:fs/promises';
import { type BootstrapReplacement } from '../types.ts';
import { getValidBootstrapPathOrThrow } from './getValidBootstrapPathOrThrow.ts';
import { substituteBootstrapVariablesOrThrow } from './substituteBootstrapVariablesOrThrow.ts';

export const applyReplacementsToFileOrThrow = async (
  staged: string,
  file: string,
  replacements: BootstrapReplacement[],
  variables: Record<string, string>,
): Promise<void> => {
  const path = getValidBootstrapPathOrThrow(staged, file);
  let content = await readFile(path, 'utf8');

  for (const replacement of replacements) {
    content = content.replaceAll(replacement.from, () =>
      substituteBootstrapVariablesOrThrow(replacement.to, variables),
    );
  }

  await writeFile(path, content);
};
