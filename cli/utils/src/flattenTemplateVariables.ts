import { type TemplateVariables, type TemplateVariablesLeaf } from './types.ts';

const isTemplateVariablesLeaf = (
  slice: string | number | boolean | TemplateVariables | undefined,
): slice is TemplateVariablesLeaf => {
  if (!slice) {
    return false;
  }

  return Object.values(slice).every(
    value => typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number',
  );
};

export const flattenTemplateVariables = (object: Record<string, TemplateVariables>, typePath: string[]) => {
  let options: Record<string, boolean | number | string> = {};
  let slice: Record<string, TemplateVariables> = object;

  if (isTemplateVariablesLeaf(object['*'])) {
    options = { ...options, ...object['*'] };
  }

  for (const path of typePath) {
    const subslice = slice[path];

    if (!subslice) {
      break;
    }

    if (isTemplateVariablesLeaf(subslice)) {
      options = { ...options, ...subslice };
      break;
    }

    // typescript struggling to derive correct type of subslice.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const templateVariablesBranch = subslice as Record<string, TemplateVariables>;

    if (isTemplateVariablesLeaf(templateVariablesBranch['*'])) {
      options = { ...options, ...templateVariablesBranch['*'] };
    }

    slice = templateVariablesBranch;
  }

  return options;
};
