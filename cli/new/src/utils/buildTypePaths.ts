export type BuildTypePaths = {
  configTypePath: string[];
  externalTypePath: string[];
  internalTypePath: string[];
};

export const buildTypePaths = (type: string, subtype?: string, customTypePath?: string): BuildTypePaths => {
  const internalTypePath = subtype ? [type, subtype] : [type];
  let configTypePath: BuildTypePaths['configTypePath'] = subtype ? ['new', type, subtype] : ['new', type];

  if (customTypePath) {
    configTypePath = [...configTypePath, ...customTypePath.split('.')];
  }

  return {
    configTypePath,
    externalTypePath: configTypePath,
    internalTypePath,
  };
};
