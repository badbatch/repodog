import { asyncExec, stringifyCliOptions, verboseLog } from '@repodog/cli-utils';

export const executeHygen = (
  templatesPath: string,
  hygenPath: string,
  typePath: string[],
  cliOptions: Record<string, boolean | number | string>
) => {
  verboseLog(`Executing hygen ${typePath.join(' ')} with the following options: ${stringifyCliOptions(cliOptions)}`);

  return asyncExec(
    `HYGEN_TMPLS=${templatesPath} ${hygenPath} ${typePath.join(' ')} ${stringifyCliOptions(cliOptions)}`
  );
};
