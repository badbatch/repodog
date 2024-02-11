---
to: "<%= typeof overrideTemplate_types_ejs_t !== 'undefined' || excludeTypesFile ? null : `${path}/src/types.ts` %>"
---
export type <%= h.capitalize(mainFilename) %>Params = {};
