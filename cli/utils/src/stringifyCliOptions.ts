export const stringifyCliOptions = (object: Record<string, boolean | number | string>) => {
  let options = '';

  for (const key in object) {
    switch (true) {
      case typeof object[key] == 'boolean' && !!object[key]: {
        options += ` --${key}`;
        break;
      }

      case typeof object[key] == 'string' || typeof object[key] == 'number': {
        options += ` --${key} "${String(object[key])}"`;
        break;
      }
    }
  }

  return options.trim();
};
