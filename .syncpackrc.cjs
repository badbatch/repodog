const { versionGroups, ...rest } = require('@repodog/syncpack-config');

module.exports = {
  ...rest,
  versionGroups: [
    {
      dependencies: ['prettier'],
      isIgnored: true,
      packages: ['@repodog/jest-config'],
    },
    ...versionGroups,
  ],
};
