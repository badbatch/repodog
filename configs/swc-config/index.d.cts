import { type Options as SWCOptions } from '@swc/core';

declare const configs: SWCOptions[] & { js: SWCOptions, ts: SWCOptions };
export = configs;
