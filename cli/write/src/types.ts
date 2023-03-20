import type { Language, PackageManager } from '@repodog/cli-utils';

export interface WriteHandlerArguments {
  filePath: string;
  skipFormat?: boolean;
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
