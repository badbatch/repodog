export interface CutReleaseArguments {
  'dry-run'?: boolean;
  force?: boolean;
  preid?: string;
  'skip-posthook'?: boolean;
  'skip-prehook'?: boolean;
  tag?: string;
  type: string;
  verbose?: boolean;
}
