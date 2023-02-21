import { readFileSync } from 'node:fs';
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

export const loadRepodogConfig = () => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = resolve(process.cwd(), REPODOG_CONFIG_FILENAME);
  let config: RepodogConfig;

  try {
    config = JSON.parse(
      readFileSync(resolve(process.cwd(), REPODOG_CONFIG_FILENAME), { encoding: 'utf8' })
    ) as RepodogConfig;
  } catch (error: unknown) {
    verboseLog(`.repodogrc read error: ${(error as Error).name}, ${(error as Error).message}`);
    throw new Error(`Could not resolve the .repodogrc at: ${configPath}`);
  }

  cachedConfig = config;
  return cachedConfig;
};
