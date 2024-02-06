import { merge } from 'lodash-es';
import { readFileSync } from 'node:fs';
import { type JsonArray, type JsonObject } from 'type-fest';
import { resolveAbsolutePath } from './resolveAbsolutePath.ts';
import { type RepodogConfig } from './types.ts';
import { verboseLog } from './verboseLog.ts';

export const resolveConfigPath = (config: RepodogConfig, key: keyof RepodogConfig, path: string) => {
  try {
    const content = JSON.parse(readFileSync(resolveAbsolutePath(path), { encoding: 'utf8' })) as JsonObject | JsonArray;
    // @ts-expect-error Not worth trying to fix this "is not assignable to type 'undefined'" error
    config[key] = config[key] ? merge({}, content, config[key]) : content;
  } catch (error: unknown) {
    verboseLog(`${key} resolve error: ${(error as Error).name}, ${(error as Error).message}`);
  }
};
