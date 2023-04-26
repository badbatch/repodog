import merge from 'lodash/merge.js';
import { readFileSync } from 'node:fs';
import { isAbsolute, resolve } from 'node:path';
import type { JsonArray, JsonObject } from 'type-fest';
import type { RepodogConfig } from './types.ts';
import { verboseLog } from './verboseLog.ts';

export const resolveConfigPath = (config: RepodogConfig, key: keyof RepodogConfig, path: string) => {
  const absolutePath = isAbsolute(path) ? path : resolve(process.cwd(), path);

  try {
    const content = JSON.parse(readFileSync(absolutePath, { encoding: 'utf8' })) as JsonObject | JsonArray;
    // @ts-expect-error Not worth trying to fix this "is not assignable to type 'undefined'" error
    config[key] = config[key] ? merge({}, content, config[key]) : content;
  } catch (error: unknown) {
    verboseLog(`${key} resolve error: ${(error as Error).name}, ${(error as Error).message}`);
  }
};
