import { isDefined } from 'remeda';

const bootstrapVariablePattern = /\{\{(\w+)(\|json)?\}\}/gu;

export const substituteBootstrapVariablesOrThrow = (template: string, variables: Record<string, string>): string =>
  template.replaceAll(bootstrapVariablePattern, (_, name: string, format: string | undefined) => {
    const value = variables[name];

    if (!isDefined(value)) {
      throw new Error(`Missing bootstrap variable: ${name}`);
    }

    return format ? JSON.stringify(value) : value;
  });
