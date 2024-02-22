export type CliOptions = Record<string, boolean | number | string>;

export interface NewHandlerArguments {
  'custom-type-path'?: string;
  'exclude-builtin-templates'?: boolean;
  subtype: string;
  type: string;
  verbose?: boolean;
}

export enum NewRepoSubtype {
  COMPONENT_LIBRARY = 'componentLibrary',
  // APP = 'app',
  LIBRARY = 'library',
  MONOREPO = 'monorepo',
  // SERVER = 'server',
}

export enum NewPkgSubtype {
  COMPONENT = 'component',
  CONFIG = 'config',
  LIBRARY = 'library',
}

export enum NewType {
  PKG = 'pkg',
  REPO = 'repo',
}
