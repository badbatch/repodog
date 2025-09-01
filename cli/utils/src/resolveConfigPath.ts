import { merge } from 'lodash-es';
import { readFileSync } from 'node:fs';
import { type JsonArray, type JsonObject } from 'type-fest';
import { resolveAbsolutePath } from './resolveAbsolutePath.ts';
import { type RepodogConfig } from './types.ts';
import { verboseLog } from './verboseLog.ts';

export const resolveConfigPath = (config: RepodogConfig, key: keyof RepodogConfig, path: string): void => {
  try {
    // JSON.parse returns an any type.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const content = JSON.parse(readFileSync(resolveAbsolutePath(path), { encoding: 'utf8' })) as JsonObject | JsonArray;
    // @ts-expect-error Not worth trying to fix this "is not assignable to type 'undefined'" error
    config[key] = config[key] ? merge({}, content, config[key]) : content;
  } catch (error: unknown) {
    // catch arg has to be of type unknown, but in this context it will
    // always be of type Error.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    verboseLog(`${key} resolve error: ${(error as Error).name}, ${(error as Error).message}`);
  }
};
