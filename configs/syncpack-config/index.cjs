module.exports = {
  semverGroups: [
    {
      dependencyTypes: ['!peer', '!pnpmOverrides'],
      range: '^',
    },
    {
      dependencyTypes: ['peer'],
      range: '<',
    },
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
      dependencyTypes: ['pnpmOverrides'],
      isIgnored: true,
    },
    {
      policy: 'sameRange',
    },
  ],
};
