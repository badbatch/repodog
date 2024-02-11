---
to: <%= path %>/tsconfig.json
from: "<%= overrideTemplate_tsconfig_ejs_t ? `${leafAdditionalTemplatesPath}/tsconfig.ejs.t` : null %>"
---
{
  "extends": ["@repodog/ts-config/index.json", "@repodog/ts-config/build.json"],
  "include": [
    "src/**/*"
  ],
  "references": []
}
