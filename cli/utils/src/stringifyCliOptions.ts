const buildOption = (object: Record<string, boolean | number | string>, key: string): string => {
  let options = '';

  switch (true) {
    case typeof object[key] === 'boolean' && object[key]: {
      options += ` --${key}`;
      break;
    }

    case typeof object[key] === 'string' || typeof object[key] === 'number': {
      options += ` --${key} "${String(object[key])}"`;
      break;
    }
  }

  return options;
};

export const stringifyCliOptions = (object: Record<string, boolean | number | string>): string => {
  let options = '';

  for (const key in object) {
    options += buildOption(object, key);
  }

  return options.trim();
};
