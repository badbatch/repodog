export interface NewHandlerArguments {
  customTypePath?: string;
  subtype?: string;
  type: string;
  verbose?: boolean;
}

export enum NewType {
  PKG = 'pkg',
  REPO = 'repo',
}
