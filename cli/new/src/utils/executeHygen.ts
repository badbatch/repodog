import { asyncExec, resolveAbsolutePath, stringifyCliOptions, verboseLog } from '@repodog/cli-utils';
import { sep } from 'node:path';
import { type CliOptions } from '../types.ts';

export const executeHygen = (
  templatesPath: string,
  hygenPath: string,
  typePath: string[],
  cliOptions: CliOptions,
): Promise<string> => {
  const hygenTypePath = typePath.length > 2 ? typePath.slice(-2) : typePath;
  const additionalTemplatePaths = typePath.length > 2 ? typePath.slice(0, -2) : [];
  const hygenTemplatesPath = resolveAbsolutePath([templatesPath, ...additionalTemplatePaths].join(sep));

  verboseLog(`Executing hygen with the following positional arguments: ${hygenTypePath.join(' ')}`);
  verboseLog(`Executing hygen with the following options: ${stringifyCliOptions(cliOptions)}`);
  verboseLog(`Executing hygen with the following templates path: ${hygenTemplatesPath}`);

  return asyncExec(
    `HYGEN_TMPLS=${hygenTemplatesPath} ${hygenPath} ${hygenTypePath.join(' ')} ${stringifyCliOptions(cliOptions)}`,
  );
};
