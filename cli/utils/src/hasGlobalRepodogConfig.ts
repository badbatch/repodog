import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { REPODOG_CONFIG_FILENAME } from './constants.ts';

export const hasGlobalRepodogConfig = () => existsSync(resolve(homedir(), REPODOG_CONFIG_FILENAME));
