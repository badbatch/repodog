import type { ReleaseType } from 'semver';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export interface PackageMeta {
  force: boolean;
  name: string;
  path: string;
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

export type ReleaseTag = 'alpha' | 'beta' | 'unstable';