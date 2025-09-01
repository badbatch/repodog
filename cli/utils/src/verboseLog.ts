import colors from 'ansi-colors';
import shelljs from 'shelljs';

let namespace = 'Repodog';
let verbose = false;

export const setVerbose = (value: boolean, name?: string): void => {
  verbose = value;

  if (name) {
    namespace = name;
  }
};

export const log = (message: string): void => {
  shelljs.echo(`${colors.magenta(namespace)} ${colors.dim('=>')} ${message}`);
};

export const verboseLog = (message: string): void => {
  if (verbose) {
    shelljs.echo(`${colors.magenta(namespace)} ${colors.dim('=>')} ${message}`);
  }
};
