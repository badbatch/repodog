---
to: tsconfig.json
---
{
  "extends": "@repodog/ts-config/index.json",
  "include": [
    ".storybook/*",
    "<%= packagesDirName %>/**/*"
  ]
}
