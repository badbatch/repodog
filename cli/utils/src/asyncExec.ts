import shelljs from 'shelljs';
import { verboseLog } from '#verboseLog.ts';

export interface AsyncExecOptions {
  silent?: boolean;
}

export const asyncExec = (command: string, options: AsyncExecOptions = {}): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    shelljs.exec(command, (code, stdout, stderr) => {
      if (code === 1 && !options.silent) {
        verboseLog(`Async exec failed to execute "${command}", exited with code ${String(code)}`);
        reject(new Error(stderr));
      } else {
        verboseLog(`Async exec ran "${command}" successfully, exited with code ${String(code)}`);
        resolve(stdout);
      }
    });
  });
