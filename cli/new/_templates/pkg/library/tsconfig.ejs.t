---
to: "<%= typeof overrideTemplate_tsconfig_ejs_t !== 'undefined' ? null : `${path}/tsconfig.json` %>"
---
{
  "extends": ["@repodog/ts-config/index.json", "@repodog/ts-config/build.json"],
  "include": [
    "src/**/*"
  ],
  "references": []
}
