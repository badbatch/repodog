export const REPODOG_CONFIG_FILENAME = '.repodogrc' as const;

export const language = {
  JAVASCRIPT: 'javascript' as const,
  TYPESCRIPT: 'typescript' as const,
};

export const newType = {
  PKG: 'pkg' as const,
  REPO: 'repo' as const,
};

export const newPackageSubtype = {
  COMPONENT: 'component' as const,
  CONFIG: 'config' as const,
  LIBRARY: 'library' as const,
};

export const newRepoSubtype = {
  COMPONENT_LIBRARY: 'componentLibrary' as const,
  LIBRARY: 'library' as const,
  MONOREPO: 'monorepo' as const,
};

export const releaseTags = {
  ALPHA: 'alpha' as const,
  BETA: 'beta' as const,
  PR: 'pr' as const,
  UNSTABLE: 'unstable' as const,
};
