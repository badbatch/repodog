export interface PostInstallHandlerArguments {
  subtype: string;
  type: string;
  verbose?: boolean;
}

export enum PostInstallSubType {
  // APP = 'app',
  LIBRARY = 'library',
  MONOREPO = 'monorepo',
  // SERVER = 'server',
}

export enum PostInstallType {
  PKG = 'pkg',
  REPO = 'repo',
}
