---
to: "<%= overrideTemplate_main_ejs_t ? null : `${path}/src/${mainFilename}.ts` %>"
---
export const <%= mainFilename %> = () => {};
