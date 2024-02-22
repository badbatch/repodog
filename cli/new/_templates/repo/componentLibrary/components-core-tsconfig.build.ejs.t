---
to: <%= packagesDirName %>/core/tsconfig.build.json
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
