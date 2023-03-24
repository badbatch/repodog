export interface NewHandlerArguments {
  customTypePath?: string;
  subtype?: string;
  type: string;
  verbose?: boolean;
}

export enum NewRepoSubtype {
  APP = 'app',
  LIBRARY = 'library',
  SERVER = 'server',
}

export enum NewType {
  PKG = 'pkg',
  REPO = 'repo',
}
