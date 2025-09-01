import { verboseLog } from '@repodog/cli-utils';
import { readdirSync } from 'node:fs';

export const compileAdditionalTemplateOverrides = (
  leafAdditionalTemplatesPath: string,
  internalTempatesPath: string,
): Record<string, boolean> => {
  const additionalfiles = readdirSync(leafAdditionalTemplatesPath);
  const internalFiles = readdirSync(internalTempatesPath);

  const overrides = additionalfiles.reduce<Record<string, boolean>>((acc, fileName) => {
    if (internalFiles.includes(fileName)) {
      acc[`overrideTemplate_${fileName.replaceAll('.', '_')}`] = true;
    }

    return acc;
  }, {});

  if (Object.keys(overrides).length > 0) {
    verboseLog(`Additional template overrides:\n${JSON.stringify(overrides, undefined, 2)}\n`);
  }

  return overrides;
};
