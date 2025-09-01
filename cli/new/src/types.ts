export type CliOptions = Record<string, boolean | number | string>;

export interface NewHandlerArguments {
  'custom-type-path'?: string;
  'exclude-builtin-templates'?: boolean;
  'skip-node-version-check'?: boolean;
  subtype: string;
  type: string;
  verbose?: boolean;
}
