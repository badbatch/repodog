---
to: <%= path %>/src/index.ts
from: "<%= overrideTemplate_index_ejs_t ? `${leafAdditionalTemplatesPath}/index.ejs.t` : null %>"
---
export * from './<%= mainFilename %>.ts';
export * from './types.ts';
