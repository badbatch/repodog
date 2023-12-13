import colors from 'ansi-colors';
import shelljs from 'shelljs';

let namespace = 'RepoDog';
let verbose = false;

export const setVerbose = (value: boolean, name?: string) => {
  verbose = value;

  if (name) {
    namespace = name;
  }
};

export const log = (message: string) => {
  shelljs.echo(`${colors.magenta(namespace)} ${colors.dim('=>')} ${message}`);
};

export const verboseLog = (message: string) => {
  if (verbose) {
    shelljs.echo(`${colors.magenta(namespace)} ${colors.dim('=>')} ${message}`);
  }
};
