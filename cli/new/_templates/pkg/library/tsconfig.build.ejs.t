---
to: <%= path %>/tsconfig.build.json
---
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/types"
  },
  "exclude": [
    "**/*.test.*"
  ]
}
