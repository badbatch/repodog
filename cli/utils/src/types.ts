import { type ReleaseType } from 'semver';

export enum Language {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
}

export enum NewPkgSubtype {
  COMPONENT = 'component',
  CONFIG = 'config',
  LIBRARY = 'library',
}

export enum NewRepoSubtype {
  COMPONENT_LIBRARY = 'componentLibrary',
  // APP = 'app',
  LIBRARY = 'library',
  MONOREPO = 'monorepo',
  // SERVER = 'server',
}

export enum NewType {
  PKG = 'pkg',
  REPO = 'repo',
}

export enum PackageManager {
  NPM = 'npm',
  PNPM = 'pnpm',
  YARN = 'yarn',
}

export interface PackageMeta {
  checked: boolean;
  force: boolean;
  name: string;
  path: string;
  versioned: boolean;
}

export type PackageMetaRecord = Record<string, PackageMeta>;

export interface PnpmWorkspaceYaml {
  packages: string[];
}

export interface PromptOption {
  initial?: boolean | number | string;
  message: string;
  name: string;
  required?: boolean;
  skip?: boolean;
  type: string;
}

export interface QuestionOverride {
  add?: PromptOption[];
  remove?: string[];
  replace?: PromptOption[];
}

export interface QuestionOverrides {
  [key: string]: QuestionOverride | QuestionOverrides;
}

export interface ReleaseMeta {
  dryrun: boolean;
  filter?: string;
  force: boolean;
  packageJsonPath: string;
  packageManager: PackageManager;
  preid?: string;
  skipPosthook: boolean;
  skipPrehook: boolean;
  tag?: ReleaseTag;
  type: ReleaseType;
}

export enum ReleaseTag {
  ALPHA = 'alpha',
  BETA = 'beta',
  PULL_REQUEST = 'pr',
  UNSTABLE = 'unstable',
}

export interface GlobalRepodogConfig {
  additionalTemplatesPath?: string;
  environmentVariablesPath?: string;
  language: Language;
  packageManager?: PackageManager;
  questionOverridesPath?: string;
  templateVariablesPath?: string;
}

export interface RepodogConfig extends GlobalRepodogConfig {
  __activeDryRun?: boolean;
  questionOverrides?: Record<string, QuestionOverrides>;
  templateVariables?: Record<string, TemplateVariables>;
}

export interface TemplateOverride {
  [key: string]: string | TemplateOverride;
}

export interface TemplateVariables {
  [key: string]: string | number | boolean | TemplateVariables;
}

export type TemplateVariablesLeaf = Record<string, string | number | boolean>;
