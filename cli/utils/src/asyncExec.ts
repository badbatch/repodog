import shelljs, { type ExecOptions } from 'shelljs';
import { verboseLog } from '#verboseLog.ts';

export interface AsyncExecOptions extends Pick<ExecOptions, 'cwd' | 'maxBuffer' | 'timeout'> {
  env?: NodeJS.ProcessEnv;
  silent?: boolean;
}

export const asyncExec = (command: string, options: AsyncExecOptions = {}): Promise<string> => {
  const { silent, ...execOptions } = options;

  return new Promise((resolve, reject) => {
    shelljs.exec(
      command,
      {
        ...execOptions,
        env: options.env ? { ...process.env, ...options.env } : process.env,
      },
      (code, stdout, stderr) => {
        if (code === 0) {
          verboseLog(`Async exec ran "${command}" successfully, exited with code ${String(code)}`);
          resolve(stdout);
        } else {
          verboseLog(`Async exec failed to execute "${command}", exited with code ${String(code)}`);

          if (silent) {
            verboseLog(stderr);
            resolve(stderr);
          } else {
            reject(new Error(stderr));
          }
        }
      },
    );
  });
};
