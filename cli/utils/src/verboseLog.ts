import colors from 'ansi-colors';
import shelljs from 'shelljs';

let verbose = false;

export const setVerbose = (value: boolean) => {
  verbose = value;
};

export const verboseLog = (message: string) => {
  if (verbose) {
    shelljs.echo(`${colors.magenta('RepoDog')} ${colors.dim('=>')} ${message}`);
  }
};
