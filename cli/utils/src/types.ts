import type { ReleaseType } from 'semver';

export enum PackageManager {
  NPM = 'npm',
  PNPM = 'pnpm',
  YARN = 'yarn',
}

export interface PackageMeta {
  force: boolean;
  name: string;
  path: string;
  versioned: boolean;
}

export type PackageMetaRecord = Record<string, PackageMeta>;

export interface PnpmWorkspaceYaml {
  packages: string[];
}

export type PreReleaseId = string;

export interface ReleaseMeta {
  dryrun: boolean;
  force: boolean;
  packageJsonPath: string;
  packageManager: PackageManager;
  preReleaseId?: PreReleaseId;
  skipPosthook: boolean;
  skipPrehook: boolean;
  tag?: ReleaseTag;
  type: ReleaseType;
}

export enum ReleaseTag {
  ALPHA = 'alpha',
  BETA = 'beta',
  UNSTABLE = 'unstable',
}

export interface RepodogConfig {
  __activeDryRun?: boolean;
  templateVariables?: Record<'new', TemplateVariables>;
}

export interface TemplateVariables {
  [key: string]: string | number | TemplateVariables;
}
