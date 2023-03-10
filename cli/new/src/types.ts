export interface NewHandlerArguments {
  subtypes?: string;
  type: string;
  verbose?: boolean;
}

export enum NewType {
  PKG = 'pkg',
  REPO = 'repo',
}
