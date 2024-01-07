---
to: <%= path %>/tsconfig.build.json
---
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist/types",
    "rootDir": "src"
  },
  "exclude": [
    "**/*.test.*"
  ]
}
