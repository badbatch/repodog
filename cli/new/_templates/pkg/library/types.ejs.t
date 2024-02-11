---
to: "<%= !excludeTypesFile ? `${path}/src/types.ts` : null %>"
from: "<%= overrideTemplate_types_ejs_t && !excludeTypesFile ? `${leafAdditionalTemplatesPath}/types.ejs.t` : null %>"
---
export type <%= h.capitalize(mainFilename) %>Params = {};
