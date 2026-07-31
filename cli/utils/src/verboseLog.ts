import colors from 'ansi-colors';
import shelljs from 'shelljs';

let namespace = 'Repodog';
let isVerbose = false;

export const setVerbose = (isVerbose_: boolean, name?: string): void => {
  isVerbose = isVerbose_;

  if (name) {
    namespace = name;
  }
};

export const log = (message: string): void => {
  shelljs.echo(`${colors.magenta(namespace)} ${colors.dim('=>')} ${message}`);
};

export const verboseLog = (message: string): void => {
  if (isVerbose) {
    shelljs.echo(`${colors.magenta(namespace)} ${colors.dim('=>')} ${message}`);
  }
};
