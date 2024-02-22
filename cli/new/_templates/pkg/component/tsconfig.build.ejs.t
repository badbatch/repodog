---
to: "<%= typeof overrideTemplate_tsconfig_build_ejs_t !== 'undefined' ? null : `${path}/tsconfig.build.json` %>"
---
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist/types/esm",
    "rootDir": "src"
  },
  "exclude": [
    "**/*.stories.*",
    "**/*.test.*"
  ]
}
