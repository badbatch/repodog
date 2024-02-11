import { verboseLog } from '@repodog/cli-utils';
import { readdirSync } from 'node:fs';

export const compileAdditionalTemplateOverrides = (
  leafAdditionalTemplatesPath: string,
  internalTempatesPath: string
) => {
  const additionalfiles = readdirSync(leafAdditionalTemplatesPath);
  const internalFiles = readdirSync(internalTempatesPath);

  const overrides = internalFiles.reduce<Record<string, boolean>>((acc, fileName) => {
    acc[`overrideTemplate_${fileName.replace(/\./g, '_')}`] = additionalfiles.includes(fileName);
    return acc;
  }, {});

  if (Object.keys(overrides).length > 0) {
    verboseLog(`Additional template overrides:\n${JSON.stringify(overrides, undefined, 2)}\n`);
  }

  return overrides;
};
