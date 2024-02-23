export type CliOptions = Record<string, boolean | number | string>;

export interface NewHandlerArguments {
  'custom-type-path'?: string;
  'exclude-builtin-templates'?: boolean;
  subtype: string;
  type: string;
  verbose?: boolean;
}
