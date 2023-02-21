import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { REPODOG_CONFIG_FILENAME } from './constants.js';
import { loadRepodogConfig } from './loadRepodogConfig.js';

export const clearDryRunFlag = () => {
  const repodogConfig = loadRepodogConfig();
  delete repodogConfig.__activeDryRun;
  const configPath = resolve(process.cwd(), REPODOG_CONFIG_FILENAME);

  if (Object.keys(repodogConfig).length === 0) {
    unlinkSync(configPath);
  } else {
    writeFileSync(configPath, JSON.stringify(repodogConfig, undefined, 2));
  }
};

export const hasDryRunFlag = () => {
  const configPath = resolve(process.cwd(), REPODOG_CONFIG_FILENAME);

  if (!existsSync(configPath)) {
    return false;
  }

  const config = loadRepodogConfig();
  return !!config.__activeDryRun;
};

export const setDryRunFlag = () => {
  const configPath = resolve(process.cwd(), REPODOG_CONFIG_FILENAME);
  const repodogConfig = existsSync(configPath) ? loadRepodogConfig() : {};
  repodogConfig.__activeDryRun = true;
  writeFileSync(configPath, JSON.stringify(repodogConfig, undefined, 2));
};
