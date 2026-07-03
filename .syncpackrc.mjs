import config from '@repodog/syncpack-config';

const { versionGroups, ...restConfig } = config;

// Required for SyncPack
// eslint-disable-next-line import-x/no-default-export
export default {
  versionGroups: [
    {
      dependencies: ['unplugin-macros'],
      pinVersion: '0.20.0',
    },
    ...versionGroups,
  ],
  ...restConfig,
};
