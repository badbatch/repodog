---
to: "<%= typeof overrideTemplate_index_ejs_t !== 'undefined' ? null : `${path}/src/index.ts` %>"
---
export * from './<%= mainFilename %>.ts';
export * from './types.ts';
