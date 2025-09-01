import { loadRepodogConfig, writeRepodogConfig } from './repodogConfig.ts';

export const clearDryRunFlag = (): void => {
  const repodogConfig = loadRepodogConfig();
  delete repodogConfig.__activeDryRun;
  writeRepodogConfig(process.cwd(), repodogConfig);
};

export const hasDryRunFlag = (): boolean => {
  const config = loadRepodogConfig();
  return !!config.__activeDryRun;
};

export const setDryRunFlag = (): void => {
  const repodogConfig = loadRepodogConfig();
  repodogConfig.__activeDryRun = true;
  writeRepodogConfig(process.cwd(), repodogConfig);
};
