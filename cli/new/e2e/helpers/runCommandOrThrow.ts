import { asyncExec, verboseLog } from '@repodog/cli-utils';

// Quote each argument separately so shell metacharacters and spaces stay literal.
const getShellQuotedArgument = (value: string): string => `'${value.replaceAll("'", "'\"'\"'")}'`;

export const runCommandOrThrow = async (cwd: string, command: string, args: string[]): Promise<void> => {
  const shellCommand = [command, ...args].map(argument => getShellQuotedArgument(argument)).join(' ');
  verboseLog(`Running ${shellCommand} in ${cwd}`);

  try {
    await asyncExec(shellCommand, {
      cwd,
      env: { CI: 'true', GIT_TERMINAL_PROMPT: '0', NEXT_TELEMETRY_DISABLED: '1' },
      maxBuffer: 20 * 1024 * 1024,
      timeout: 20 * 60 * 1000,
    });
  } catch (error) {
    throw new Error(`${shellCommand} failed in ${cwd}.`, { cause: error });
  }
};
