---
to: <%= path %>/tsconfig.build.json
from: "<%= overrideTemplate_tsconfig_build_ejs_t ? `${leafAdditionalTemplatesPath}/tsconfig.build.ejs.t` : null %>"
---
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist/types/esm",
    "rootDir": "src"
  },
  "exclude": [
    "**/*.test.*"
  ]
}
