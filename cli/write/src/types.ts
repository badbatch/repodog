import { type Language, type PackageManager } from '@repodog/cli-utils';

export interface WriteHandlerArguments {
  'file-path': string;
  'skip-format'?: boolean;
  type: string;
  verbose?: boolean;
}

export enum WriteType {
  TEST = 'test',
}

export interface WriteMeta {
  language: Language;
  packageManager: PackageManager;
  skipFormat: boolean;
}
