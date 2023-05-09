---
to: tsconfig.build.json
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
  ]
}
