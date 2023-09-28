import shelljs from 'shelljs';
import { verboseLog } from './verboseLog.ts';

export interface AsyncExecOptions {
  silent?: boolean;
}

export const asyncExec = (cmd: string, options: AsyncExecOptions = {}) =>
  new Promise<string>((resolve, reject) => {
    shelljs.exec(cmd, (code, stdout, stderr) => {
      if (code === 1 && !options.silent) {
        verboseLog(`Async exec failed to execute "${cmd}", exited with code ${code}`);
        reject(new Error(stderr));
      } else {
        verboseLog(`Async exec ran "${cmd}" successfully, exited with code ${code}`);
        resolve(stdout);
      }
    });
  });
