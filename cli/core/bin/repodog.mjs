#!/usr/bin/env node
import 'suppress-experimental-warnings';

const { init } = await import('../dist/esm/index.mjs'); // eslint-disable-line import/no-unresolved
init();
