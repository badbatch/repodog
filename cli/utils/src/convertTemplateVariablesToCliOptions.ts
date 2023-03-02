import type { TemplateVariables, TemplateVariablesLeaf } from './types.js';

const convertObjectToCliOptions = (object: Record<string, boolean | number | string>) => {
  let options = '';

  for (const key in object) {
    switch (true) {
      case typeof object[key] == 'boolean' && !!object[key]: {
        options += ` --${key}`;
        break;
      }

      case typeof object[key] == 'string' || typeof object[key] == 'number': {
        options += ` --${key} ${String(object[key])}`;
        break;
      }
    }
  }

  return options.trim();
};

const isTemplateVariablesLeaf = (
  slice: string | number | boolean | TemplateVariables | undefined
): slice is TemplateVariablesLeaf => {
  if (!slice) {
    return false;
  }

  return Object.values(slice).every(
    value => typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number'
  );
};

export const convertTemplateVariablesToCliOptions = (object: Record<string, TemplateVariables>, paths: string[]) => {
  let options: Record<string, boolean | number | string> = {};
  let slice: Record<string, TemplateVariables> = object;

  if (isTemplateVariablesLeaf(object['*'])) {
    options = { ...options, ...object['*']! };
  }

  for (const path of paths) {
    const subslice = slice[path];

    if (!subslice) {
      break;
    }

    if (isTemplateVariablesLeaf(subslice)) {
      options = { ...options, ...subslice };
      break;
    }

    const templateVariablesBranch = subslice as Record<string, TemplateVariables>;

    if (isTemplateVariablesLeaf(templateVariablesBranch['*'])) {
      options = { ...options, ...templateVariablesBranch['*'] };
    }

    slice = templateVariablesBranch;
  }

  return convertObjectToCliOptions(options);
};
