export interface BootstrapReplacement {
  from: string;
  to: string;
}

export interface BootstrapFileReplacement extends BootstrapReplacement {
  file: string;
}

export interface BootstrapOmission {
  exclude: string[];
  fileReplacements: BootstrapFileReplacement[];
}

export interface BootstrapManifest {
  exclude: string[];
  files: string[];
  renamePaths: BootstrapReplacement[];
  replacements: BootstrapReplacement[];
  version: 1;
  whenMissing?: Record<string, BootstrapOmission>;
}

export interface BootstrapOrigin {
  commit: string;
  ref: string;
  repository: string;
}

export interface AppVariables extends Record<string, string> {
  configPrefix: string;
  counterpartPath: string;
  counterpartRepository: string;
  name: string;
  namespace: string;
  owner: string;
  repository: string;
}
