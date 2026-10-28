import shelljs from 'shelljs';
import { verboseLog } from '#verboseLog.ts';

export interface AsyncExecOptions {
  env?: NodeJS.ProcessEnv;
  silent?: boolean;
}

export const asyncExec = (command: string, options: AsyncExecOptions = {}): Promise<string> =>
  new Promise((resolve, reject) => {
    shelljs.exec(
      command,
      {
        env: options.env ? { ...process.env, ...options.env } : process.env,
      },
      (code, stdout, stderr) => {
        if (code === 0) {
          verboseLog(`Async exec ran "${command}" successfully, exited with code ${String(code)}`);
          resolve(stdout);
        } else {
          verboseLog(`Async exec failed to execute "${command}", exited with code ${String(code)}`);

          if (options.silent) {
            verboseLog(stderr);
            resolve(stderr);
          } else {
            reject(new Error(stderr));
          }
        }
      },
    );
  });
