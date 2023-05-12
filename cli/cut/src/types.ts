export interface CutHandlerArguments {
  'dry-run'?: boolean;
  force?: boolean;
  'skip-posthook'?: boolean;
  'skip-prehook'?: boolean;
  tag?: string;
  type: string;
  verbose?: boolean;
}
