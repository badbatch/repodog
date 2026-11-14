import { type AppVariables } from './types.ts';

const applicationNamePattern = /^[a-z][a-z0-9-]*$/u;
const githubOwnerPattern = /^[\w-]+$/u;
const githubRepositoryNamePattern = /^[A-Za-z0-9_][\w.-]*$/u;
const dotnetNamespacePattern = /^[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*$/u;
const configurationPrefixPattern = /^[A-Z][A-Z0-9_]*_$/u;

const getValidNameOrThrow = (value: string | undefined): string => {
  if (!value || !applicationNamePattern.test(value)) {
    throw new Error(
      'Application names must start with a lowercase letter and contain lowercase letters, digits or hyphens.',
    );
  }

  return value;
};

const getValidOwnerOrThrow = (value: string | undefined): string => {
  if (!value || !githubOwnerPattern.test(value)) {
    throw new Error('Provide a valid GitHub owner.');
  }

  return value;
};

const getValidCounterpartRepositoryOrThrow = (value: string | undefined): string => {
  const counterpartRepository = value?.trim() ?? '';

  if (counterpartRepository && !githubRepositoryNamePattern.test(counterpartRepository)) {
    throw new Error('Provide a valid counterpart repository name, or leave it blank.');
  }

  return counterpartRepository;
};

const getValidNamespaceOrThrow = (value: string | undefined, name: string): string => {
  const namespace = value?.length
    ? value
    : name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

  if (!dotnetNamespacePattern.test(namespace)) {
    throw new Error('Provide a valid .NET namespace.');
  }

  return namespace;
};

const getValidConfigPrefixOrThrow = (value: string | undefined, name: string): string => {
  const configPrefix = value?.length ? value : `${name.replaceAll('-', '_').toUpperCase()}_`;

  if (!configurationPrefixPattern.test(configPrefix)) {
    throw new Error(
      'Configuration prefixes must contain uppercase letters, digits or underscores and end in an underscore.',
    );
  }

  return configPrefix;
};

const getRepository = (owner: string, name: string): string => `${owner}/${name}`;

const getCounterpartPath = (counterpartRepository: string): string =>
  counterpartRepository ? `../${counterpartRepository}` : '';

const getAnswerVariables = (answers: Record<string, string | number | boolean>): Record<string, string> =>
  Object.fromEntries(Object.entries(answers).map(([key, value]) => [key, String(value)]));

export const getValidAppVariablesOrThrow = (answers: Record<string, string | number | boolean>): AppVariables => {
  const values = getAnswerVariables(answers);
  const name = getValidNameOrThrow(values.name);
  const owner = getValidOwnerOrThrow(values.owner);
  const counterpartRepository = getValidCounterpartRepositoryOrThrow(values.counterpartRepository);

  return {
    ...values,
    configPrefix: getValidConfigPrefixOrThrow(values.configPrefix, name),
    counterpartPath: getCounterpartPath(counterpartRepository),
    counterpartRepository,
    name,
    namespace: getValidNamespaceOrThrow(values.namespace, name),
    owner,
    repository: getRepository(owner, name),
    ...(values.description !== undefined && { description: values.description }),
  };
};
