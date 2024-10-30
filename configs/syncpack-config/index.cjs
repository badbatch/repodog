module.exports = {
  semverGroups: [
    {
      dependencyTypes: ['!pnpmOverrides'],
      range: '^',
    },
    {
      dependencyTypes: ['pnpmOverrides'],
      range: '>=',
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
