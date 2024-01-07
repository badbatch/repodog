---
to: <%= path %>/tsconfig.json
---
{
  "extends": ["@repodog/ts-config/index.json", "@repodog/ts-config/build.json"],
  "include": [
    "src/**/*"
  ],
  "references": []
}
