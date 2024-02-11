---
to: "<%= overrideTemplate_index_ejs_t ? null : `${path}/src/index.ts` %>"
---
export * from './<%= mainFilename %>.ts';
export * from './types.ts';
