export type CliOptions = Record<string, boolean | number | string>;

export interface NewHandlerArguments {
  'custom-type-path'?: string;
  subtype: string;
  type: string;
  verbose?: boolean;
}

export enum NewSubtype {
  // APP = 'app',
  LIBRARY = 'library',
  MONOREPO = 'monorepo',
  // SERVER = 'server',
}

export enum NewType {
  PKG = 'pkg',
  REPO = 'repo',
}
