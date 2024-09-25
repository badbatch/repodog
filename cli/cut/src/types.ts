export interface CutHandlerArguments {
  'dry-run'?: boolean;
  /**
   * A glob to filter packages. Option only
   * relevant within the context of a monorepo.
   */
  filter?: string;
  force?: boolean;
  preid?: string;
  'skip-posthook'?: boolean;
  'skip-prehook'?: boolean;
  tag?: string;
  type: string;
  verbose?: boolean;
}
