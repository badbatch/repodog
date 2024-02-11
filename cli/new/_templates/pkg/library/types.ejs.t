---
to: "<%= overrideTemplate_types_ejs_t || excludeTypesFile ? null : `${path}/src/types.ts` %>"
---
export type <%= h.capitalize(mainFilename) %>Params = {};
