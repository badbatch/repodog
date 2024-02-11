---
to: <%= path %>/src/<%= mainFilename %>.ts
from: "<%= overrideTemplate_main_ejs_t ? `${leafAdditionalTemplatesPath}/main.ejs.t` : null %>"
---
export const <%= mainFilename %> = () => {};
