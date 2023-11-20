module.exports = {
  semverGroups: [
    {
      dependencyTypes: ['!peer'],
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
    'exports',
    'main',
    'types',
    'publishConfig',
    'scripts',
    'dependencies',
    'peerDependencies',
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
