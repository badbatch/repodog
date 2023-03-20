import { asyncExec, getLanguageExtension, getPackageManagerTemporaryCmd } from '@repodog/cli-utils';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { WriteMeta } from '../types.js';
import { injectFileExtension } from './injectFileExtension.js';
import { removeComments } from './removeComments.js';

export const writeTestFile = async (
  directory: string,
  name: string,
  code: string,
  { language, packageManager, skipFormat }: WriteMeta
) => {
  const extension = getLanguageExtension(language);
  const testFilePath = resolve(directory, `${name}.test.${extension}`);
  const updatedCode = removeComments(injectFileExtension(code));
  writeFileSync(testFilePath, updatedCode);

  if (!skipFormat) {
    const temperaryCmd = getPackageManagerTemporaryCmd(packageManager);
    await asyncExec(`${temperaryCmd} eslint --fix ${testFilePath}`, { silent: true });
  }
};
