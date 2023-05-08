export const buildTypePaths = (type: string, subtype?: string, customTypePath?: string) => {
  const internalTypePath = subtype ? [type, subtype] : [type];
  let configTypePath = subtype ? ['new', type, subtype] : ['new', type];

  if (customTypePath) {
    configTypePath = [...configTypePath, ...customTypePath.split('.')];
  }

  return {
    configTypePath,
    externalTypePath: configTypePath,
    internalTypePath,
  };
};
