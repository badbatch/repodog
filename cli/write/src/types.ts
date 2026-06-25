import { type Language, type PackageManager } from '@repodog/cli-utils';

export interface WriteHandlerArguments {
  'file-path': string;
  'skip-format'?: boolean;
  'skip-node-version-check'?: boolean;
  type: string;
  verbose?: boolean;
}

export type WriteType = 'test';

export interface WriteMeta {
  language: Language;
  packageManager: PackageManager;
  skipFormat: boolean;
}
