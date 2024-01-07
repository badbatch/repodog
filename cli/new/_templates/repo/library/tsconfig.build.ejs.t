---
to: tsconfig.build.json
---
{
  "extends": ["./tsconfig.json", "@repodog/ts-config/build.json"],
  "compilerOptions": {
    "outDir": "dist/types",
    "rootDir": "src"
  },
  "exclude": [
    "**/*.test.*"
  ]
}
