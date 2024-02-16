---
to: "<%= typeof overrideTemplate_types_ejs_t !== 'undefined' || typeof excludeTypesFile !== 'undefined' ? null : `${path}/src/types.ts` %>"
---
export type <%= h.capitalize(mainFilename) %>Params = {};
