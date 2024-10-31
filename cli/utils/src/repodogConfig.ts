import { merge } from 'lodash-es';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { REPODOG_CONFIG_FILENAME } from './constants.ts';
import { resolveConfigPath } from './resolveConfigPath.ts';
import { type GlobalRepodogConfig, Language, type RepodogConfig } from './types.ts';

let cachedConfig: RepodogConfig | undefined;

export const addRepodogConfigToCache = (config: Partial<RepodogConfig>) => {
  const newConfig = merge({}, cachedConfig ?? {}, config);

  if (!newConfig.language) {
    newConfig.language = existsSync(resolve(process.cwd(), 'tsconfig.json'))
      ? Language.TYPESCRIPT
      : Language.JAVASCRIPT;
  }

  // Need to look into why this is cast in more detail.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  cachedConfig = newConfig as RepodogConfig;
  return newConfig;
};

export const clearRepodogConfigCache = () => {
  cachedConfig = undefined;
};

export const getCachedRepodogConfig = () => cachedConfig;

export const readRepodogConfig = <C>(basePath: string) => {
  try {
    // JSON.parse returns an any type.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return JSON.parse(readFileSync(resolve(basePath, REPODOG_CONFIG_FILENAME), { encoding: 'utf8' })) as C;
  } catch {
    return;
  }
};

export interface LoadRepodogConfigArguments {
  required?: boolean;
}

export const loadRepodogConfig = ({ required = false }: LoadRepodogConfigArguments = {}) => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const globalConfig = readRepodogConfig<GlobalRepodogConfig>(homedir());
  const projectConfig = readRepodogConfig<RepodogConfig>(process.cwd());

  // Empty object is not equivalent to RepodogConfig even though
  // all properties are optional.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const config = (
    globalConfig || projectConfig ? merge({}, globalConfig ?? {}, projectConfig ?? {}) : {}
  ) as RepodogConfig;

  if (required && Object.keys(config).length === 0) {
    throw new Error('Could not resolve the .repodogrc either within a project or globally');
  }

  if (config.questionOverridesPath) {
    resolveConfigPath(config, 'questionOverrides', config.questionOverridesPath);
  }

  if (config.templateVariablesPath) {
    resolveConfigPath(config, 'templateVariables', config.templateVariablesPath);
  }

  return addRepodogConfigToCache(config);
};

export const writeRepodogConfig = (basePath: string, newConfig: Partial<RepodogConfig>) => {
  const configPath = resolve(basePath, REPODOG_CONFIG_FILENAME);
  writeFileSync(configPath, JSON.stringify(addRepodogConfigToCache(newConfig), undefined, 2));
};
