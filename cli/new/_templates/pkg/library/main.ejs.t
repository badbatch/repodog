---
to: "<%= typeof overrideTemplate_main_ejs_t !== 'undefined' ? null : `${path}/src/${mainFilename}.ts` %>"
---
export const <%= mainFilename %> = () => {};
