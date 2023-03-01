import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { REPODOG_CONFIG_FILENAME } from './constants.js';
import type { RepodogConfig } from './types.js';
import { verboseLog } from './verboseLog.js';

let cachedConfig: RepodogConfig | undefined;

export const addRepodogConfigToCache = (config: RepodogConfig) => {
  cachedConfig = config;
};

export const clearRepodogConfigCache = () => {
  cachedConfig = undefined;
};

export const getCachedRepodogConfig = () => cachedConfig;

export interface LoadRepodogConfigArguments {
  required?: boolean;
}

export const loadRepodogConfig = ({ required = false }: LoadRepodogConfigArguments = {}) => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = resolve(process.cwd(), REPODOG_CONFIG_FILENAME);
  let config: RepodogConfig = {};

  if (required) {
    try {
      config = JSON.parse(readFileSync(configPath, { encoding: 'utf8' })) as RepodogConfig;
    } catch (error: unknown) {
      verboseLog(`.repodogrc read error: ${(error as Error).name}, ${(error as Error).message}`);
      throw new Error(`Could not resolve the .repodogrc at: ${configPath}`);
    }
  } else if (existsSync(configPath)) {
    config = JSON.parse(readFileSync(configPath, { encoding: 'utf8' })) as RepodogConfig;
  }

  cachedConfig = config;
  return cachedConfig;
};

export const writeRepodogConfig = (repodogConfig: RepodogConfig) => {
  cachedConfig = repodogConfig;
  const configPath = resolve(process.cwd(), REPODOG_CONFIG_FILENAME);

  if (Object.keys(repodogConfig).length === 0) {
    unlinkSync(configPath);
  } else {
    writeFileSync(configPath, JSON.stringify(repodogConfig, undefined, 2));
  }
};
