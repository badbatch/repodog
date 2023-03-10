---
to: <%= path %>/tsconfig.json
---
{
  "extends": "@repodog/ts-config/build.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/types"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "**/*.test.*"
  ],
  "references": []
}
