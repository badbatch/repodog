// Required for SyncPack
// eslint-disable-next-line import-x/no-default-export
export default {
  semverGroups: [
    {
      dependencyTypes: ['!peer', '!pnpmOverrides'],
      range: '^',
    },
    {
      dependencyTypes: ['peer'],
      range: '<',
    },
    {
      dependencyTypes: ['pnpmOverrides'],
      range: '>=',
    },
  ],
  sortExports: [
    'source',
    'types',
    'node-addons',
    'node',
    'browser',
    'module',
    'import',
    'require',
    'svelte',
    'development',
    'production',
    'script',
    'default',
  ],
  sortFirst: [
    'name',
    'description',
    'version',
    'author',
    'license',
    'private',
    'homepage',
    'repository',
    'bugs',
    'type',
    'engines',
    'bin',
    'main',
    'module',
    'types',
    'imports',
    'exports',
    'publishConfig',
    'scripts',
    'dependencies',
    'peerDependencies',
    'peerDependenciesMeta',
    'devDependencies',
  ],
  versionGroups: [
    {
      dependencies: ['$LOCAL'],
      dependencyTypes: ['prod', 'dev'],
      pinVersion: 'workspace:*',
    },
    {
      policy: 'sameRange',
    },
  ],
};
