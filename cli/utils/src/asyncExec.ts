import shelljs from 'shelljs';
import { verboseLog } from './verboseLog.js';

export interface AsyncExecOptions {
  silent?: boolean;
}

export const asyncExec = (cmd: string, options: AsyncExecOptions = {}) =>
  new Promise<string>((resolve, reject) => {
    shelljs.exec(cmd, (code, stdout, stderr) => {
      if (stderr && !options.silent) {
        verboseLog(`Async exec failed, exited with code ${code}`);
        reject(new Error(stderr));
      } else {
        verboseLog(`Async exec ran successfully, exited with code ${code}`);
        resolve(stdout);
      }
    });
  });
